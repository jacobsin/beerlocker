'use strict';

import '../../helpers/chai';

import Elevator from '../../../elevator/elevator';

describe('elevator', ()=> {

  before(function () {
    this.elevator = new Elevator({floors: 5});
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
        expect(()=>this.elevator.call({from: 5, direction: 'up'}))
          .to.throw('cannot call upward from floor 5');
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

      before(function () {
        this.elevator.floor = 3;
      });

      it('should fail request to current floor', function () {
        expect(()=>this.elevator.request({to: 3}))
          .to.throw('cannot request current floor');
      });

      it('should fail request to floor below current when going up', function () {
        this.elevator.direction = 'up';
        expect(()=>this.elevator.request({to: 2}))
          .to.throw('cannot request floor below current when going up');
      });

      it('should fail request to floor above current when going down', function () {
        this.elevator.direction = 'down';
        expect(()=>this.elevator.request({to: 4}))
          .to.throw('cannot request floor above current when going down');
      });

    });

  });

  describe('getStateString', ()=> {

    before(function () {
      this.elevator = new Elevator({floors: 5});
    })

    it('should give pictoral string of current state', function () {
      expect(this.elevator.getStateString()).to.equal(
        '  | -\n'+
        '5 |  \n'+
        '4 |  \n'+
        '3 |  \n'+
        '2 |  \n'+
        '1 |  \n'+
        '0 | I');
    });

  });

  describe('move', ()=> {

    before(function () {
      this.elevator = new Elevator({floors: 5});
      this.elevator.move();
    });

    it('should stay on same floor', function () {
      expect(this.elevator.floor).to.equal(0);
    });

    it('should give correct state', function () {
      expect(this.elevator.getStateString()).to.equal(
        '  | -\n'+
        '5 |  \n'+
        '4 |  \n'+
        '3 |  \n'+
        '2 |  \n'+
        '1 |  \n'+
        '0 | I');
    });

    describe('when called from floor above', ()=> {

      before(function () {
        this.elevator.call({from: 4, direction: 'down'});
        this.elevator.move();
      });

      it('should move up', function () {
        expect(this.elevator.floor).to.equal(1);
      });

      it('should give correct state', function () {
        expect(this.elevator.getStateString()).to.equal(
          '  | ^\n'+
          '5 |  \n'+
          '4 |  \n'+
          '3 |  \n'+
          '2 |  \n'+
          '1 | I\n'+
          '0 |  ');
      });

      describe('when continue to move', ()=> {

        before(function () {
          this.elevator.move();
          this.elevator.move();
        });

        it('should move toward calling floor', function () {
          expect(this.elevator.floor).to.equal(3);
        });

        it('should give correct state', function () {
          expect(this.elevator.getStateString()).to.equal(
            '  | ^\n'+
            '5 |  \n'+
            '4 |  \n'+
            '3 | I\n'+
            '2 |  \n'+
            '1 |  \n'+
            '0 |  ');
        });

        describe('when move to calling floor', ()=> {

          before(function () {
            this.elevator.move();
          });

          it('should be on calling floor', function () {
            expect(this.elevator.floor).to.equal(4);
          });

          it('should give correct state', function () {
            expect(this.elevator.getStateString()).to.equal(
              '  | -\n'+
              '5 |  \n'+
              '4 | I\n'+
              '3 |  \n'+
              '2 |  \n'+
              '1 |  \n'+
              '0 |  ');
          });

        });

      });

    });

  });

});
