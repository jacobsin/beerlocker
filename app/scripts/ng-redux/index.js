/*eslint-disable import/default*/
/*eslint-disable import/namespace*/
/*eslint-disable import/no-named-as-default*/
/*eslint-disable import/no-named-as-default-member*/
/*eslint-disable import/import/named*/
/*eslint-disable no-undef*/


import '../../styles/angular.less';

import filters from '../angular/filters.coffee';
import services from '../angular/services.coffee';
import controllers from './controllers';
import directives from '../angular/directives/index.coffee';
import routes from '../angular/routes.coffee';

import {reducers} from '../react/rootReducer';
import promiseMiddleware from 'redux-promise-middleware';
import ngRedux from 'ng-redux';

import { default as DevTools, runDevTools} from './dev-tools';

const app = angular.module('phonecatApp', [
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
app.run(runDevTools);
