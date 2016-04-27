require '../../helpers/angular'
require '../../helpers/chai'

AngularApp = require './angular-app.coffee'

describe 'Search Phone', ->

  before ->
#    @app = new AngularApp()
#    @app.start()

  it 'should have fixture el', ->
    $('#mocha-fixture').length.should.be.equal(1)
