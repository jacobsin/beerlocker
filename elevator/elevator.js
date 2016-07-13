'use strict';

import validateCall from './validate-call';

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

const validateRequest = (elevator)=> {
  return (request)=> {
    if (request.to == elevator.floor) {
      throw 'cannot request current floor';
    }
    if (request.to < elevator.floor && elevator.direction == 'up') {
      throw 'cannot request floor below current when going up'
    }
  };
};

export default Elevator;
