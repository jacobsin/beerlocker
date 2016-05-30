import fetchMock from 'fetch-mock';
import 'isomorphic-fetch';

import {triggerer, register} from './../dom-event/angular-trigger';

class NgReduxApp {

  constructor(module, element, attachTo) {
    this.fetchMock = fetchMock;
    this.module = module;
    this.element = element;
    this.attachTo = attachTo || $('mocha-fixture');

    this.$injector = angular.injector(['ng', 'ngMock', this.module]);
    this.$httpBackend = this.$injector.get('$httpBackend');
    this.$scope = this.$injector.get('$rootScope').$new();
    this.$compile = this.$injector.get('$compile');

    register();
  }

  start() {
    this.$el = angular.element(this.element);
    this.$compile(this.$el)(this.$scope);
    this.attachTo.append(this.$el);

    this.$scope.$digest();
  }

  stop() {
    triggerer.restore();
    this.fetchMock.restore();
    this.attachTo.empty();
  }
}

export default NgReduxApp;
