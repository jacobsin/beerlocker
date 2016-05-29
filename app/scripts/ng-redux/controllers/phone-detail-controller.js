/*eslint-disable no-debugger*/
import * as PhoneActions from '../../react/phones/actions';

export default class PhoneDetailController {

  constructor($ngRedux, $scope, $routeParams) {
    const unsubscribe = $ngRedux.connect(this.mapStateToTarget, PhoneActions)($scope);
    $scope.$on('$destroy', unsubscribe);

    $ngRedux.dispatch(PhoneActions.fetchOne($routeParams.phoneId));
  }

  // Which part of the Redux global state does our component want to receive?
  mapStateToTarget(state) {
    return {
      phone: state.phones.detail,
      mainImageUrl: state.phones.mainImageUrl
    };
  }
}

PhoneDetailController.$inject = ['$ngRedux', '$scope', '$routeParams'];
