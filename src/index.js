import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import routes from './routes';

require('./main.scss');

ReactDOM.render(
	<Router history={browserHistory}>
		{routes}
	</Router>,
	document.getElementById('app')
);


