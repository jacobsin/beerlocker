'use strict';

import validateCall from './validate-call';
import validateRequest from './validate-request';

class Elevator {

  constructor({floors}) {
    this.calls = [];
    this.requests = [];
    this.floor = 0;
    this.floors = floors;
    this.validateCall = validateCall(floors);
    this.validateRequest = validateRequest(this);
  }

  call(call) {
    this.validateCall(call);
    this.calls.push(call);
  }

  request(request) {
    this.validateRequest(request);
    this.requests.push(request);
  }

  getStateString() {
    const rows = [];

    const direction = '-';
    rows.push(`  | ${direction}`);

    for (let i = this.floors; i >= 0; i--) {
      let floorState = ' ';
      if (i == this.floor) {
        floorState = 'I';
      }
      rows.push(`${i} | ${floorState}`);
    }

    return rows.join('\n');
  }
}

export default Elevator;
