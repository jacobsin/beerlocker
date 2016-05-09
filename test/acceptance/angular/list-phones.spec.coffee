require '../../helpers/angular'
require '../../helpers/chai'

require '../../../app/scripts/angular/app.coffee'
AngularApp = require '../framework/angular-app.coffee'
_ = require 'lodash'

describe 'List Phones', ->

  before ->
    @app = new AngularApp('phonecatApp', '<div ng-view></div>')

    @app.httpBackend.when('GET', 'api/static/phones/phones.json')
      .respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}])

    @app.start()
    window.location = '/phones'

  it 'should render sidebar', ->
    $('.sidebar').should.have.length.of(1)

  it 'should render search input', ->
    $('.sidebar input.search').should.have.length.of(1)

  it 'should have no search input value by default', ->
    $('.sidebar input.search').should.have.$val('')

  it 'should render sort by dropdown', ->
    $('.sidebar select.sort-by').should.have.length.of(1)

  it 'should sort by age by default', ->
    $('.sidebar select.sort-by').should.have.$val('age')

  it 'should render phone list', ->
    $('.phones').should.have.length.of(1)

  it 'should have phone names', ->
    _($('.phones .name')).map('innerHTML').value().should.be.deep.equal(['Nexus S', 'Motorola DROID'])
