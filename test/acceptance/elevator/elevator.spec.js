'use strict';

import '../../helpers/chai';

import Elevator from '../../../elevator/elevator';

describe('elevator', ()=> {

  before(function () {
    this.elevator = new Elevator({floors: 10});
  });

  describe('initialize', ()=> {

    it('should have no calls', function () {
      expect(this.elevator.calls).to.have.length(0);
    });

    it('should have no requests', function () {
      expect(this.elevator.requests).to.have.length(0);
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

    it('should know which floor the call is originated from', function () {
      expect(this.elevator.calls[0]).to.have.property('from', 1);
    });

    it('should know which direction the call is for', function () {
      expect(this.elevator.calls[0]).to.have.property('direction', 'down');
    });

    describe('invalid call', ()=> {

      it('should fail call downward from ground floor', function () {
        expect(()=>this.elevator.call({from: 0, direction: 'down'}))
          .to.throw('cannot call downward from ground floor');
      });

      it('should fail call upward from top floor', function () {
        expect(()=>this.elevator.call({from: 10, direction: 'up'}))
          .to.throw('cannot call upward from floor 10');
      });

    });

  });

  describe('request', ()=> {

    before(function () {
      this.elevator.request({to: 3});
    });

    it('should add to requests', function () {
      expect(this.elevator.requests).to.have.length(1);
    });

    it('should know which floor the request is destinated to', function () {
      expect(this.elevator.requests[0]).have.property('to', 3);
    });

    describe('invalid request', ()=> {

      it('should fail request to current floor', function () {
        expect(()=>this.elevator.request({to: 0}))
          .to.throw('cannot request current floor');
      });

      it('should fail request to floor below current when going up', function () {
        this.elevator.floor = 3;
        this.elevator.direction = 'up';
        expect(()=>this.elevator.request({to: 2}))
          .to.throw('cannot request floor below current when going up');
      });


    });

  });



});
