directives = angular.module('phonecatDirectives', [])

directives.directive 'phoneDetail', require('./phone-detail-directive')
directives.directive 'phoneList', require('./phone-list-directive')

module.exports = directives
