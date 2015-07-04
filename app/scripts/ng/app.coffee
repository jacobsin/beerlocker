require('./controllers')
require('./filters')
require('./services')

phonecatApp = angular.module 'phonecatApp', [
    'ngRoute',
    'phonecatControllers',
    'phonecatFilters',
    'phonecatServices'
]

phonecatApp.config ['$routeProvider',
    ($routeProvider) ->
        $routeProvider
            .when '/phones', {
                templateUrl: 'scripts/ng/partials/phone-list.html',
                controller: 'PhoneListCtrl'
            }
            .when '/phones/:phoneId', {
                templateUrl: 'scripts/ng/partials/phone-detail.html',
                controller: 'PhoneDetailCtrl'
            }
            .otherwise {
                redirectTo: '/phones'
            }
]
