import '../../helpers/jsdom'
import '../../helpers/chai'

import {newRootComponent} from '../../../app/scripts/react/rootComponent';
import ReactApp from '../framework/react-app'
import SidebarTester from '../framework/sidebar-tester.coffee'
import PhoneListTester from '../framework/phone-list-tester.coffee'

describe('List Phones', ()=> {

  before(function () {
    this.app = new ReactApp(newRootComponent());

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

  it('should render sidebar', function () {
    this.sidebar.$el.should.have.length.of(1);
  });

  it('should render search input', function () {
    this.sidebar.getSearchInput().should.have.length.of(1);
  });

  it('should have no search input value by default', function () {
    this.sidebar.getSearchInput().should.have.$val('');
  });

  it('should render sort by dropdown', function () {
    this.sidebar.getSortBySelect().should.have.length.of(1);
  });

  it('should sort by age by default', function () {
    this.sidebar.getSortBySelect().should.have.$val('age');
  });

  it('should render phone list', function () {
    this.phoneList.$el.should.have.length.of(1);
  });

  it('should have phone names', function () {
    this.phoneList.getNames().should.be.deep.equal(['Motorola DROID', 'Nexus S']);
  });

});
