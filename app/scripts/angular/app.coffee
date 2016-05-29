require('./filters')
require('./services')
require('./controllers')
require('./phone-detail-directive')
require('./phone-list-directive')
routes = require('./routes')

phonecatApp = angular.module 'phonecatApp', [
    'phoneDetailDirective',
    'phoneListDirective',
    'phonecatControllers',
    'phonecatFilters',
    'phonecatServices',
    'ngRoute'
]

phonecatApp.config routes

module.exports = phonecatApp
