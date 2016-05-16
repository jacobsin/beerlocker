export const triggerer = {};

function noopTrigger() {

}

function restore() {
  triggerer.trigger = noopTrigger;
}

triggerer.trigger = noopTrigger;
triggerer.restore = restore;

export default triggerer;
