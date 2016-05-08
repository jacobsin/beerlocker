require('./filters')
require('./services')
require('./phone-detail-directive')
require('./phone-list-directive')

phonecatApp = angular.module 'phonecatApp', [
    'ngRoute',
    'phoneDetailDirective',
    'phoneListDirective',
    'phonecatFilters',
    'phonecatServices'
]

phonecatApp.config ['$routeProvider',
    ($routeProvider) ->
        $routeProvider
            .when '/phones', {
                template: '<phone-list></phone-list>'
                controller: 'PhoneListCtrl'
            }
            .when '/phones/:phoneId', {
                template: '<phone-detail></phone-detail>'
                controller: 'PhoneDetailCtrl'
            }
            .otherwise {
                redirectTo: '/phones'
            }
]
