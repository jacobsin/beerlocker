import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers';

const composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware()
)(createStore);

export default function configureStore(initialState) {
  return composeStoreWithMiddleware(rootReducer, initialState);
}
