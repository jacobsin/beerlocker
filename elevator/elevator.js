'use strict';

class Elevator {
  constructor() {
    this.calls = [];
    this.floor = 0;
  }

  call(call) {
    this.calls.push(call);
  }
}

export default Elevator;
