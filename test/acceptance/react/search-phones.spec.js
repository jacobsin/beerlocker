import '../../helpers/jsdom';
import '../../helpers/chai';

import rootComponent from '../../../app/scripts/react/rootComponent';
import ReactApp from '../framework/react-app';
import SidebarTester from '../framework/sidebar-tester.coffee';
import PhoneListTester from '../framework/phone-list-tester.coffee';

describe('Search Phones', ()=> {

  before(function () {
    this.app = new ReactApp(rootComponent);

    this.app.fetchMock.mock("api/static/phones/phones.json",
      [{name: 'Nexus S', id: 'nexus-s'}, {name: 'Motorola DROID', id: 'motorola-droid'}]);

    this.app.start();

    window.location = '/phones';

    this.sidebar = new SidebarTester();
    this.phoneList = new PhoneListTester();
  });

  after(function () {
    this.app.stop();
  });

  it('should have no search input value by default', function () {
    this.sidebar.getSearchInput().should.have.$val('');
  });

  it('should have phone names', function () {
    this.phoneList.getNames().should.be.deep.equal(['Motorola DROID', 'Nexus S']);
  });

  describe('search by name', ()=> {

    before(function () {
      this.sidebar.search('Nex');
    });

    xit('should have phone names', function () {
      this.phoneList.getNames().should.be.deep.equal(['Nexus S']);
    });

  });

});
