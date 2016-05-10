_ = require 'lodash'

class PhoneListTester
  constructor: ->
    @$el = $('.phones')

  getNames: ->
    _(@$el.find('.name')).map('innerHTML').value()

module.exports = PhoneListTester
