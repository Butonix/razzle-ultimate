import React from 'react';
import express from 'express';
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable/webpack';
import createMemoryHistory from 'history/createMemoryHistory';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import fs from 'fs-extra';
import apiClient from '../apiClient';
import ultimateRender from '../render';
import ProvidersContext from '../context/Providers';

const paths = require('razzle/config/paths');
// eslint-disable-next-line
// const assets = require(paths.appManifest);
let assets = {};
if (fs.pathExistsSync(paths.appManifest)) {
  assets = fs.readJsonSync(paths.appManifest);
} else {
  console.warn('assets.json does not exists');
}

let vendorAssets = {};

if (process.env.RAZZLE_VENDOR_MANIFEST) {
  console.log(require.resolve(process.env.RAZZLE_VENDOR_MANIFEST));

  const vendorFile = `${paths.appBuild}/${process.env.RAZZLE_VENDOR_MANIFEST}`;
  if (fs.pathExistsSync(vendorFile)) {
    vendorAssets = fs.readJsonSync(vendorFile);
  } else {
    console.log('vendor.json does not exists: ', vendorFile);
  }
}

const index = express();

index.disable('x-powered-by');
if (process.env.NODE_ENV === 'production') {
  index.use(express.static(paths.appBuildPublic));
} else {
  index.use(express.static(paths.appPublic));
}

export default index;

export const render = (
  {req, res},
  stats,
  routes,
  {initializeStore, providers},
  wrapper,
  awaitRender,
  ErrorPage = null
) => {
  (async () => {
    try {
      const history = createMemoryHistory({
        initialEntries: [req.originalUrl],
      });
      providers.client = apiClient(req);
      providers.history = history;
      const store = initializeStore({}, providers);

      let bundles = [];
      const customRenderer = node => {
        const modules = [];
        const App = (
          <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <ProvidersContext.Provider value={{providers}}>
              <Provider store={store}>
                {typeof wrapper === 'function' ? wrapper(node) : node}
              </Provider>
            </ProvidersContext.Provider>
          </Loadable.Capture>
        );
        const Html = renderToString(App);
        bundles = getBundles(stats, modules);

        return {
          html: Html,
          bundles,
        };
      };

      if (typeof awaitRender === 'function') {
        await awaitRender({store, providers, req, res});
      }
      await Loadable.preloadReady();

      const html = await ultimateRender({
        req,
        res,
        customRenderer,
        routes,
        assets: Object.assign({}, vendorAssets, assets),
        store,
        history,
        client: providers.client,
        ErrorPage
      });
      res.send(html);
    } catch (error) {
      console.trace('MOUNT ERROR', error);
      res.json(error);
    }
  })();
};
