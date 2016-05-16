/*eslint-disable import/default*/

import React from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';

import routes from './routes';

import configureStore from './store/configureStore';

export function newRootComponent() {
  return (
    <Provider store={configureStore()}>
      <Router history={hashHistory} routes={routes}/>
    </Provider>
  );
}
export default newRootComponent();
