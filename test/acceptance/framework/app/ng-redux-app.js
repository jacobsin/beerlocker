import fetchMock from 'fetch-mock';
import 'isomorphic-fetch';

import {triggerer, register} from './../dom-event/angular-trigger';

class NgReduxApp {

  constructor(module, element, attachTo = $('#mocha-fixture')) {
    this.fetchMock = fetchMock;
    this.module = module;
    this.element = element;
    this.attachTo = attachTo;

    this.$injector = angular.injector(['ng', 'ngMock', this.module]);
    this.$httpBackend = this.$injector.get('$httpBackend');
    this.$timeout = this.$injector.get('$timeout');
    this.$scope = this.$injector.get('$rootScope');
    this.$compile = this.$injector.get('$compile');
    this.$location = this.$injector.get('$location');
    this.$ngRedux = this.$injector.get('$ngRedux');

    register();
  }

  start() {
    this.$el = angular.element(this.element);
    this.$compile(this.$el)(this.$scope);
    this.attachTo.append(this.$el);
    // this.$httpBackend.flush();

    this.$scope.$digest();
  }

  stop() {
    triggerer.restore();
    this.fetchMock.restore();
    this.attachTo.empty();
  }
}

export default NgReduxApp;
