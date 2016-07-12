'use strict';

import validateCall from './validate-call';

class Elevator {
  constructor() {
    this.calls = [];
    this.floor = 0;
  }

  call(call) {
    validateCall(call);
    this.calls.push(call);
  }
}

export default Elevator;
