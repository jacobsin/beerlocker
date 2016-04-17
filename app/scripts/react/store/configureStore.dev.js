//This file merely configures the store for hot reloading.
//This boilerplate file is likely to be the same for each project that uses Redux.
//With Redux, the actual stores are in /reducers.

import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../rootReducer';

const composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware()
)(createStore);

export default function configureStore(initialState) {
  let store = composeStoreWithMiddleware(rootReducer, initialState, compose(
    // Add other middleware on this line...
    window.devToolsExtension ? window.devToolsExtension() : f => f //add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer', () => {
      const nextReducer = require('../rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
