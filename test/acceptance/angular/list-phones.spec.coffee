require '../../helpers/angular'
require '../../helpers/chai'

require '../../../app/scripts/angular/app.coffee'
AngularApp = require '../framework/app/angular-app.coffee'
SidebarTester = require '../framework/tester/sidebar-tester.coffee'
PhoneListTester = require '../framework/tester/phone-list-tester.coffee'

describe 'List Phones', ->

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

  it 'should render sidebar', ->
    @sidebar.$el.should.have.length.of(1)

  it 'should render search input', ->
    @sidebar.getSearchInput().should.have.length.of(1)

  it 'should have no search input value by default', ->
    @sidebar.getSearchInput().should.have.$val('')

  it 'should render sort by dropdown', ->
    @sidebar.getSortBySelect().should.have.length.of(1)

  it 'should sort by age by default', ->
    @sidebar.getSortBySelect().should.have.$val('age')

  it 'should render phone list', ->
    @phoneList.$el.should.have.length.of(1)

  it 'should have phone names', ->
    @phoneList.getNames().should.be.deep.equal(['Nexus S', 'Motorola DROID'])
