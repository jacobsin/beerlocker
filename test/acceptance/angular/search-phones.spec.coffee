require '../../helpers/angular'
require '../../helpers/chai'

require '../../../app/scripts/angular/app.coffee'
AngularApp = require '../framework/angular-app.coffee'
_ = require 'lodash'

describe 'Search Phones', ->

  before ->
    @app = new AngularApp('phonecatApp', '<div ng-view></div>')

    @app.$httpBackend.when('GET', 'api/static/phones/phones.json')
      .respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}])

    @app.start()
    window.location = '/phones'

  after ->
    @app.stop()

  it 'should have no search input value by default', ->
    $('.sidebar input.search').should.have.$val('')

  it 'should have phone names', ->
    _($('.phones .name')).map('innerHTML').value().should.be.deep.equal(['Nexus S', 'Motorola DROID'])

  describe 'search by name', ->

    before ->
      angular.element($('.sidebar input.search').val('Nex')).triggerHandler('input')
#      @app.$scope.query = 'Nex'
#      @app.apply()

    it 'should have phone names', ->
      _($('.phones .name')).map('innerHTML').value().should.be.deep.equal(['Nexus S'])
