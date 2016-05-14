import React from 'react';
import { render } from 'react-dom';

import '../../styles/react.less';

import rootElement from './rootComponent';

render(
  rootElement, document.getElementById('app')
);
