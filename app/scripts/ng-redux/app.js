/*eslint-disable import/default*/
/*eslint-disable import/namespace*/
/*eslint-disable import/no-named-as-default*/
/*eslint-disable import/no-named-as-default-member*/
/*eslint-disable import/import/named*/
/*eslint-disable no-undef*/

import filters from '../angular/filters.coffee';
import services from '../angular/services.coffee';
import controllers from './controllers';
import directives from '../angular/directives/index.coffee';
import routes from './routes';

import {reducers} from '../react/rootReducer';
import promiseMiddleware from 'redux-promise-middleware';
import ngRedux from 'ng-redux';

import DevTools from './dev-tools';

export const app = angular.module('phonecatReduxApp', [
  directives.name,
  controllers.name,
  filters.name,
  services.name,
  'ngRoute',
  ngRedux
]);

app.config(($ngReduxProvider) => {
  $ngReduxProvider.createStoreWith(reducers, [promiseMiddleware()], [DevTools.instrument()]);
});

app.config(routes);
