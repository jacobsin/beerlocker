import React   from 'react';
import {render} from 'react-dom';
import {Simulate} from 'react-addons-test-utils';

import fetchMock from 'fetch-mock';
import 'isomorphic-fetch';

class ReactApp {

  constructor(rootComponent, attachTo) {
    this.fetchMock = fetchMock;
    this.rootComponent = rootComponent;
    this.attachTo = attachTo || document.getElementById('mocha-fixture');
    this.Simulate = Simulate;
  }

  start() {
    this.component = render(this.rootComponent, this.attachTo);
  }

  stop() {
    this.fetchMock.restore();
    this.attachTo.innerHTML = null;
  }
}

export default ReactApp;
