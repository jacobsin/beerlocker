import React   from 'react';
import {render} from 'react-dom';

import fetchMock from 'fetch-mock';
import 'isomorphic-fetch';

import {triggerer, register} from './../dom-event/react-trigger';

class ReactApp {

  constructor(rootComponent, attachTo) {
    this.fetchMock = fetchMock;
    this.rootComponent = rootComponent;
    this.attachTo = attachTo || document.getElementById('mocha-fixture');
    register();
  }

  start() {
    this.component = render(this.rootComponent, this.attachTo);
  }

  stop() {
    triggerer.restore();
    this.fetchMock.restore();
    this.attachTo.innerHTML = null;
  }
}

export default ReactApp;
