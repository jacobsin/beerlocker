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
                templateUrl: require('./partials/phone-list.html'),
                controller: 'PhoneListCtrl'
            }
            .when '/phones/:phoneId', {
                templateUrl: require('./partials/phone-detail.html'),
                controller: 'PhoneDetailCtrl'
            }
            .otherwise {
                redirectTo: '/phones'
            }
]
