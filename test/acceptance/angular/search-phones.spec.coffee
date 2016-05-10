require '../../helpers/angular'
require '../../helpers/chai'

require '../../../app/scripts/angular/app.coffee'
AngularApp = require '../framework/angular-app.coffee'
SidebarTester = require '../framework/sidebar-tester.coffee'
PhoneListTester = require '../framework/phone-list-tester.coffee'

describe 'Search Phones', ->

  before ->
    @app = new AngularApp('phonecatApp', '<div ng-view></div>')

    @app.$httpBackend.when('GET', 'api/static/phones/phones.json')
      .respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}])

    @app.start()
    window.location = '/phones'
    @sidebar = new SidebarTester()
    @phoneList = new PhoneListTester()

  after ->
    @app.stop()

  it 'should have no search input value by default', ->
    @sidebar.getSearchInput().should.have.$val('')

  it 'should have phone names', ->
    @phoneList.getNames().should.be.deep.equal(['Nexus S', 'Motorola DROID'])

  describe 'search by name', ->

    before ->
      @sidebar.search('Nex')

    it 'should have phone names', ->
      @phoneList.getNames().should.be.deep.equal(['Nexus S'])
