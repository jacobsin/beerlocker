import React   from 'react';
import {render} from 'react-dom';

import fetchMock from 'fetch-mock';

class ReactApp {

  constructor(rootComponent, attachTo) {
    this.fetchMock = fetchMock;
    this.rootComponent = rootComponent;
    this.attachTo = attachTo || document.getElementById('mocha-fixture');
  }

  start() {
    this.component = render(this.rootComponent, this.attachTo);
  }

  stop() {
    this.fetchMock.restore();
  }
}

export default ReactApp;
