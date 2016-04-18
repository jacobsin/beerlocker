/*eslint-disable import/default*/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';


import { fetchAll } from './phones/actions';
import routes from './routes';

import configureStore from './store/configureStore';

import '../../styles/react.less';

const store = configureStore();
store.dispatch(fetchAll());

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes}/>
  </Provider>, document.getElementById('app')
);
