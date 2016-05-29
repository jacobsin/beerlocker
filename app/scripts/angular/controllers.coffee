phonecatControllers = angular.module 'phonecatControllers', []

phonecatControllers.controller 'PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone'
  ($scope, $routeParams, Phone) ->
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, (phone) ->
      $scope.mainImageUrl = phone.images[0]
    )

    $scope.selectImage = (imageUrl) ->
      $scope.mainImageUrl = imageUrl
]

phonecatControllers.controller 'PhoneListCtrl', ['$scope', 'Phone',
  ($scope, Phone) ->
    $scope.phones = Phone.query()
    $scope.orderProp = 'age'
]
