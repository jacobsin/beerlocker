class SidebarTester
  constructor: ->
    @$el = $('.sidebar')

  getSearchInput: ->
    @$el.find('input.search')

  getSortBySelect: ->
    @$el.find('select.sort-by')

  search: (query)->
    $el = @getSearchInput().val(query).trigger('change')
    angular?.element($el).triggerHandler('change')

module.exports = SidebarTester
