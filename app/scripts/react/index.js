/*eslint-disable import/default*/

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {fetchAll} from './phones/actions';
import PhoneList from './phones/components/PhoneList';

import configureStore from './store/configureStore';

import '../../styles/react.less';

const store = configureStore();
store.dispatch(fetchAll());

render(
  <Provider store={store}>
    <PhoneList/>
  </Provider>, document.getElementById('app')
);
