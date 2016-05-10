import '../../helpers/angular'
import '../../helpers/chai'

import '../../../app/scripts/angular/app.coffee'
import ReactApp from '../framework/angular-app'
import SidebarTester from '../framework/sidebar-tester.coffee'
import PhoneListTester from '../framework/phone-list-tester.coffee'

describe('List Phones', ()=> {

  before(function () {
    this.app = new ReactApp('phonecatApp', '<div ng-view></div>');

    this.app.$httpBackend.when('GET', 'api/static/phones/phones.json')
      .respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

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
    this.phoneList.getNames().should.be.deep.equal(['Nexus S', 'Motorola DROID']);
  });

});
