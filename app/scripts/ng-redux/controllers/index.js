/*eslint-disable no-undef*/

import PhoneListController from './phone-list-controller';
import PhoneDetailController from './phone-detail-controller';

const phonecatControllers = angular.module('phonecatControllers', []);

// phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//   ($scope, $routeParams, Phone) => {
//     $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, (phone) => {
//       $scope.mainImageUrl = phone.images[0];
//     });
//
//     $scope.setImage = (imageUrl) => {
//       $scope.mainImageUrl = imageUrl;
//     };
//   }
// ]);

phonecatControllers.controller('PhoneDetailCtrl', PhoneDetailController);

phonecatControllers.controller('PhoneListCtrl', PhoneListController);

export default phonecatControllers;
