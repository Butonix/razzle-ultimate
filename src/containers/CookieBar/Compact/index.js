import React from 'react';
import Loadable from 'react-loadable';

const constLoadable = Loadable({
  loader: () => import('./Compact'),
  loading: () => <div>Loading</div>,
});

export default constLoadable;
