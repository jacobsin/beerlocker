phonecatControllers = angular.module 'phonecatControllers', []

phonecatControllers.controller 'PhoneListCtrl', ['$scope', '$http',
    ($scope, $http) ->
        $http.get('api/static/phones/phones.json').success((data) ->
            $scope.phones = data.splice(0, 5)
        )
        $scope.orderProp = 'age'
]

phonecatControllers.controller 'PhoneDetailCtrl', ['$scope', '$routeParams', '$http'
    ($scope, $routeParams, $http) ->
        $http.get('api/static/phones/' + $routeParams.phoneId + '.json').success((data) ->
            $scope.phone = data
        )
]
