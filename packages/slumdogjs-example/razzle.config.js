// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');
const UltimateReactLoadable = require('../slumdogjs-core/src/webpack/react-loadable');
const sassLoader = require('../slumdogjs-core/src/webpack/sass');
// const DLLLoader = require('../slumdogjs-core/src/webpack/webpack-dll');
const RawLoader = require('../slumdogjs-core/src/webpack/raw-loader');
const Lodash = require('../slumdogjs-core/src/webpack/lodash');
const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  modify: (baseConfig, {dev, target}) => {
    baseConfig.devtool = dev ? 'source-map' : '';
    let appConfig = Object.assign({}, baseConfig);
    appConfig = UltimateReactLoadable(appConfig, {dev, target});
    appConfig = sassLoader(appConfig, {dev, target});
    appConfig = RawLoader(appConfig, {dev, target});
    appConfig = Lodash(appConfig, {dev, target}, {
      shorthands: true,
      cloning: true,
      currying: false,
      caching: false,
      collections: true,
      exotics: false,
      guards: false,
      metadata: false,
      deburring: false,
      unicode: false,
      chaining: false,
      memoizing: false,
      coercions: false,
      flattening: true,
      paths: true,
      placeholders: false,
    });
    /* appConfig = DLLLoader(appConfig, {dev, target},
      [

        'babel-runtime/core-js/array/from',
        'babel-runtime/core-js/get-iterator',
        'babel-runtime/core-js/is-iterable',
        'babel-runtime/core-js/json/stringify',
        'babel-runtime/core-js/number/is-integer',
        'babel-runtime/core-js/number/is-safe-integer',
        'babel-runtime/core-js/object/assign',
        'babel-runtime/core-js/object/create',
        'babel-runtime/core-js/object/define-property',
        'babel-runtime/core-js/object/get-own-property-descriptor',
        'babel-runtime/core-js/object/get-own-property-names',
        'babel-runtime/core-js/object/get-prototype-of',
        'babel-runtime/core-js/object/keys',
        'babel-runtime/core-js/object/set-prototype-of',
        'babel-runtime/core-js/promise',
        'babel-runtime/core-js/symbol',
        'babel-runtime/core-js/symbol/iterator',
        'babel-runtime/helpers/class-call-check',
        'babel-runtime/helpers/classCallCheck',
        'babel-runtime/helpers/create-class',
        'babel-runtime/helpers/createClass',
        'babel-runtime/helpers/defineProperty',
        'babel-runtime/helpers/extends',
        'babel-runtime/helpers/get',
        'babel-runtime/helpers/inherits',
        'babel-runtime/helpers/interop-require-default',
        'babel-runtime/helpers/interopRequireDefault',
        'babel-runtime/helpers/object-without-properties',
        'babel-runtime/helpers/objectWithoutProperties',
        'babel-runtime/helpers/possibleConstructorReturn',
        'babel-runtime/helpers/slicedToArray',
        'babel-runtime/helpers/to-consumable-array',
        'babel-runtime/helpers/toConsumableArray',
        'babel-runtime/helpers/typeof',

        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/react-fontawesome',
        'axios',
        'core-js',
        'lodash',
        'react',
        'redux',
        'classnames',
        'cookies-js',
        'prop-types',
        'nprogress',
        'moment',
        'localforage',
        'history',
        'multireducer',
        'react-router',
        'react-router-config',
        'final-form',
        'final-form-arrays',
        'react-dom',
        // 'react-bootstrap',
        'react-datetime',
        'react-final-form',
        'react-final-form-arrays',
        'react-helmet',
        'react-redux',
        'react-router-dom',
        'redux-devtools-extension',
        'redux-persist-cookie-storage',
        'redux-thunk'
      ]
    ); */

    if (dev && target === 'web') {
      // appConfig.plugins.push(new BundleAnalyzerPlugin());
    }

    const fileLoaderFinder = makeLoaderFinder('babel-loader');
    const jsxRule = appConfig.module.rules.find(fileLoaderFinder);
    jsxRule.include.push(path.resolve(__dirname, '..'));
    appConfig.resolve.modules.push('node_modules');

    appConfig.plugins.push(
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      /* new HardSourceWebpackPlugin({
        // Either an absolute path or relative to webpack's options.context.
        cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
        // Either a string of object hash function given a webpack config.
        configHash: function(webpackConfig) {
          // node-object-hash on npm can be used to build this.
          return require('node-object-hash')({sort: false}).hash(webpackConfig);
        },
        // Either false, a string, an object, or a project hashing function.
        environmentHash: {
          root: process.cwd(),
          directories: [],
          files: ['package-lock.json', 'yarn.lock'],
        },
        // An object.
        info: {
          // 'none' or 'test'.
          mode: 'none',
          // 'debug', 'log', 'info', 'warn', or 'error'.
          level: 'debug',
        },
        // Clean up large, old caches automatically.
        cachePrune: {
          // Caches younger than `maxAge` are not considered for deletion. They must
          // be at least this (default: 2 days) old in milliseconds.
          maxAge: 2 * 24 * 60 * 60 * 1000,
          // All caches together must be larger than `sizeThreshold` before any
          // caches will be deleted. Together they must be at least this
          // (default: 50 MB) big in bytes.
          sizeThreshold: 50 * 1024 * 1024
        },
      }) */
    );

    if (dev && process.env.DEV_HOSTNAME && process.env.PROTOCOL) {
      appConfig.output.publicPath = `${process.env.PROTOCOL}${process.env.DEV_HOSTNAME}:${parseInt(process.env.PORT,10) + 1}/`;
    }

    return appConfig;
  }
};
