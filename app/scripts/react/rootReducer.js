import { combineReducers } from 'redux';
import phones from './phones';

const reducers = {
  [phones.constants.NAME]: phones.reducer
};

const combined = combineReducers(reducers);

export {reducers, combined as default};
