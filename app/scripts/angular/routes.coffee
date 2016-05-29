routes = ['$routeProvider',
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

module.exports = routes
