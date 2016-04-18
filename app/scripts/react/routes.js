import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import PhoneList from './phones/components/PhoneList';
import PhoneDetail from './phones/components/PhoneDetail';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PhoneList} />
    <Route path="phones/:id" component={PhoneDetail} />
  </Route>
);
