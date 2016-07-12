'use strict';

import validateCall from './validate-call';

class Elevator {
  constructor({floors}) {
    this.calls = [];
    this.floor = 0;
    this.floors = floors;
    this.validateCall = validateCall(floors);
  }

  call(call) {
    this.validateCall(call);
    this.calls.push(call);
  }
}

export default Elevator;
