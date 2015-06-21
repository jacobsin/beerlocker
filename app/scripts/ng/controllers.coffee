phonecatApp = angular.module('phonecatApp', [])

phonecatApp.controller 'PhoneListCtrl', ['$scope', '$http',
    ($scope, $http) ->
        $http.get('api/phones/phones.json').success(
            (data) -> $scope.phones = data.splice(0, 5)
        )
        $scope.orderProp = 'age'
]
