'use strict';

import '../../helpers/chai';

import Elevator from '../../../elevator/elevator';

describe('elevator', ()=> {

  before(function () {
    this.elevator = new Elevator();
  });

  describe('initialize', ()=> {

    it('should have no calls', function () {
      expect(this.elevator.calls).to.have.length(0);
    });

    it('should be on ground floor', function () {
      expect(this.elevator.floor).to.be.equal(0);
    });

  });

  describe('call', ()=> {

    before(function () {
      this.elevator.call({from: 1, direction: 'down'});
    });

    it('should add to calls', function () {
      expect(this.elevator.calls).to.have.length(1);
    });

    it('should know which floor the call was originated from', function () {
      expect(this.elevator.calls[0]).to.have.property('from', 1);
    });

    it('should know which direction the call is for', function () {
      expect(this.elevator.calls[0]).to.have.property('direction', 'down');
    });

  });

});
