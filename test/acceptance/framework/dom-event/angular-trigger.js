import triggerer from './triggerer';

function angularTrigger($el, event) {
  angular.element($el).triggerHandler(event);
}

function register() {
  triggerer.trigger = angularTrigger;
}

export { triggerer, register };
