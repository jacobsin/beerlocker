#angular = require('angular')
{register, triggerer} = require './../dom-event/angular-trigger'

class AngularApp

  constructor: (@module, @element, @attachTo = $('#mocha-fixture')) ->
    @$injector = angular.injector(['ng', 'ngMock', @module])
    @$httpBackend = @$injector.get('$httpBackend')
    @$scope = @$injector.get('$rootScope')
    @$compile = @$injector.get('$compile')
    @$location = @$injector.get('$location');

    register()

  start: ->
    @$el = angular.element(@element)
    @$compile(@$el)(@$scope)
    @attachTo.append(@$el)

    @$httpBackend.flush()
    @$scope.$digest()

    debugger

  apply: ->
    @$scope.$apply()

  stop: ->
    triggerer.restore()
    @attachTo.empty()


module.exports = AngularApp
