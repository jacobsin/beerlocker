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
}

export default Elevator;
