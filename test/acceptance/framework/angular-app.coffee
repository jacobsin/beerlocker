#angular = require('angular')

class AngularApp

  constructor: (@module, @element, @attachTo = $('#mocha-fixture')) ->
    @injector = angular.injector(['ng', 'ngMock', @module])
    @httpBackend = @injector.get('$httpBackend')
    @rootScope = @injector.get('$rootScope')

  start: ->
    el = angular.element(@element)
    compile = @injector.get('$compile')

    compile(el)(@rootScope)
    @attachTo.append(el)

    @httpBackend.flush()
    @rootScope.$digest()


module.exports = AngularApp
