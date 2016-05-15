import React from 'react';
import { render } from 'react-dom';

import '../../styles/react.less';

import rootComponent from './rootComponent';

render(
  rootComponent, document.getElementById('app')
);
