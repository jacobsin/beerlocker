/*eslint-disable import/default*/

import React from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';

import routes from './routes';

import configureStore from './store/configureStore';

const store = configureStore();

export default (
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>
);
