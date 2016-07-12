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


});
