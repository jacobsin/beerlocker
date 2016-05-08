require '../../helpers/angular'
require '../../helpers/chai'

AngularApp = require './angular-app.coffee'
require '../../../app/scripts/angular/app.coffee'
_ = require 'lodash'

describe 'List Phones', ->

  before ->
    @app = new AngularApp('phonecatApp', '<div ng-view></div>', $('#mocha-fixture'))

    @app.httpBackend.when('GET', 'api/static/phones/phones.json')
      .respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}])

    @app.start()
    window.location = '/phones'

  it 'should render sidebar', ->
    $('.sidebar').length.should.be.equal(1)

  it 'should render search input', ->
    $('.sidebar input.search').length.should.be.equal(1)

  it 'should have no search input value by default', ->
    $('.sidebar input.search').val().should.be.equal('')

  it 'should render sort by dropdown', ->
    $('.sidebar select.sort-by').length.should.be.equal(1)

  it 'should sort by age by default', ->
    $('.sidebar select.sort-by').val().should.be.equal('age')

  it 'should render phone list', ->
    $('.phones').length.should.be.equal(1)

  it 'should have phone names', ->
    _($('.phones .name')).map('innerHTML').value().should.be.deep.equal(['Nexus S', 'Motorola DROID'])
