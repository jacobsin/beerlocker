'use strict';

import validateCall from './validate-call';
import validateRequest from './validate-request';

class Elevator {

  constructor({floors}) {
    this.calls = [];
    this.requests = [];
    this.moves = [];
    this.floor = 0;
    this.floors = floors;
    this.validateCall = validateCall(floors);
    this.validateRequest = validateRequest(this);
  }

  call(call) {
    this.validateCall(call);
    this.calls.push(call);
    this.moves = this.moves.concat(toMoves({from: this.floor, to: call.from}))
  }

  request(request) {
    this.validateRequest(request);
    this.requests.push(request);
  }

  getStateString() {
    const rows = [];

    let direction = '-';
    if (this.direction == 'up') direction = '^';
    if (this.direction == 'down') direction = 'v';
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

  move() {
    const next = this.moves.pop();
    switch (next) {
      case 'up':
        this.direction = 'up';
        this.floor++;
        break;
    }
    if (this.moves.length == 0) this.direction = undefined;
  }

}

const toMoves = ({from, to})=> {
  const moves = [];
  for (let u = from; u < to; u++) {
    moves.push('up');
  }
  return moves;
};

export default Elevator;
