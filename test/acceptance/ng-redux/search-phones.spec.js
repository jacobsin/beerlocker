import '../../helpers/angular';
import '../../helpers/chai';

import '../../../app/scripts/ng-redux/app';
import NgReduxApp from '../framework/app/ng-redux-app';
import SidebarTester from '../framework/tester/sidebar-tester.coffee';
import PhoneListTester from '../framework/tester/phone-list-tester.coffee';

describe('Search Phones - ng-redux', ()=> {

  before(function () {
    this.app = new NgReduxApp('phonecatReduxApp', '<div ng-view></div>');

    this.app.fetchMock.mock("api/static/phones/phones.json",
      [
        {name: 'Nexus S', id: 'nexus-s', snippet: 'some-snippet'},
        {name: 'Motorola DROID', id: 'motorola-droid' , snippet: 'some-other-snippet'}
      ]);

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
    this.app.$scope.$digest();
    this.phoneList.getNames().should.be.deep.equal(['Nexus S', 'Motorola DROID']);
  });

  describe('search by name', ()=> {

    before(function () {
      this.sidebar.search('nex');
    });

    it('should have phone names', function () {
      this.phoneList.getNames().should.be.deep.equal(['Nexus S']);
    });

  });

});
