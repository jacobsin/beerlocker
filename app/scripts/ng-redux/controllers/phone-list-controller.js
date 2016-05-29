import * as PhoneActions from '../../react/phones/actions';

export default class PhoneListController {

  constructor($ngRedux, $scope) {
    const unsubscribe = $ngRedux.connect(this.mapStateToTarget, PhoneActions)($scope);
    $scope.$on('$destroy', unsubscribe);

    $ngRedux.dispatch(PhoneActions.fetchAll());
  }

  // Which part of the Redux global state does our component want to receive?
  mapStateToTarget(state) {
    return {
      orderProp: state.phones.sortOrder,
      phones: state.phones.items
    };
  }
}

PhoneListController.$inject = ['$ngRedux', '$scope'];
