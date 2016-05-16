{triggerer} = require '../dom-event/triggerer'

class SidebarTester
  constructor: ->
    @$el = $('.sidebar')

  getSearchInput: ->
    @$el.find('input.search')

  getSortBySelect: ->
    @$el.find('select.sort-by')

  search: (query)->
    $el = @getSearchInput().val(query).trigger('change')
    triggerer.trigger($el, 'change')

module.exports = SidebarTester
