phoneListDirective = angular.module('phoneListDirective', [])

phoneListDirective.directive 'phoneList', ->
  template: '''
<div class="container-fluid">
    <div class="row">
        <div class="col-md-2 sidebar">
            <!--Sidebar content-->

            Search: <input class="search" ng-model="query">
            Sort by:
            <select class="sort-by" ng-model="orderProp">
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
                <option value="-age">Oldest</option>
            </select>

        </div>
        <div class="col-md-10">
            <!--Body content-->

            <ul class="phones">
                <li ng-repeat="phone in phones | filter:query | orderBy:orderProp" class="thumbnail">
                    <a href="#/phones/{{phone.id}}" class="thumb"><img ng-src="{{phone.imageUrl}}"></a>
                    <a href="#/phones/{{phone.id}}" class="name">{{phone.name}}</a>
                    <p>{{phone.snippet}}</p>
                </li>
            </ul>

        </div>
    </div>
</div>
'''

phoneListDirective.controller 'PhoneListCtrl', ['$scope', 'Phone',
  ($scope, Phone) ->
    $scope.phones = Phone.query()
    $scope.orderProp = 'age'
]
