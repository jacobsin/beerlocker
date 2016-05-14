import React   from 'react';
import {render} from 'react-dom';
import {fakeServer} from 'sinon';
// import { renderIntoDocument } from 'react-addons-test-utils';
import rootElement from '../../../app/scripts/react/rootComponent';

class ReactApp {

  constructor() {
    this.server = fakeServer.create();
  }

  start() {
    this.component = render(rootElement, document.getElementById('mocha-fixture'));
  }

  stop() {
    this.server.respond();
  }
}

export default ReactApp;
