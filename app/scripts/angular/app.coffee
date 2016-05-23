require('./filters')
require('./services')
require('./phone-detail-directive')
require('./phone-list-directive')
require('./routes')

phonecatApp = angular.module 'phonecatApp', [
    'phoneDetailDirective',
    'phoneListDirective',
    'phonecatFilters',
    'phonecatServices',
    'phonecatRoutes',
]

module.exports = phonecatApp
