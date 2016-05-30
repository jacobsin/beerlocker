export default function routes($routeProvider) {
  $routeProvider
    .when('/phones', {
      template: '<phone-list></phone-list>',
      controller: 'PhoneListReduxCtrl'
    })
    .when('/phones/:phoneId', {
      template: '<phone-detail></phone-detail>',
      controller: 'PhoneDetailReduxCtrl'
    })
    .otherwise ({
      redirectTo: '/phones'
    });
}

routes.$inject = ['$routeProvider'];

