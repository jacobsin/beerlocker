#angular = require('angular')
{register, triggerer} = require './../dom-event/angular-trigger'

class AngularApp

  constructor: (@module, @element, @attachTo = $('#mocha-fixture')) ->
    @$injector = angular.injector(['ng', 'ngMock', @module])
    @$httpBackend = @$injector.get('$httpBackend')
    @$scope = @$injector.get('$rootScope').$new()
    @$compile = @$injector.get('$compile')
    register()

  start: ->
    @$el = angular.element(@element)
    @$compile(@$el)(@$scope)
    @attachTo.append(@$el)

    @$httpBackend.flush()
    @$scope.$digest()

  apply: ->
    @$scope.$apply()

  stop: ->
    triggerer.restore()
    @attachTo.empty()


module.exports = AngularApp
