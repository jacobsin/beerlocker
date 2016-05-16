import triggerer from './triggerer';
import {Simulate} from 'react-addons-test-utils';

function reactTrigger($el, event) {
  var trigger = Simulate[event];
  if (!trigger) throw new Error(`event ${event} not supported by Simulate`);
  trigger($el[0]);
}

function register() {
  triggerer.trigger = reactTrigger;
}

export { triggerer, register };
