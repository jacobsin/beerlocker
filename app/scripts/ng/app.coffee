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
                templateUrl: require('./partials/phone-list').name,
                controller: 'PhoneListCtrl'
            }
            .when '/phones/:phoneId', {
                templateUrl: require('./partials/phone-detail').name,
                controller: 'PhoneDetailCtrl'
            }
            .otherwise {
                redirectTo: '/phones'
            }
]
