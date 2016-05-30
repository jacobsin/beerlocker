/*eslint-disable import/default*/
/*eslint-disable import/namespace*/
/*eslint-disable import/no-named-as-default*/
/*eslint-disable import/no-named-as-default-member*/
/*eslint-disable import/import/named*/
/*eslint-disable no-undef*/


import '../../styles/angular.less';
import {app} from './app';

import {runDevTools} from './dev-tools';

app.run(runDevTools);
