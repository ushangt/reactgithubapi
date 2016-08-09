import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Detail from './components/Detail/Detail';
import List from './components/List/List';
import App from './components/App/App';
import User from './components/User/User';

const routes = (
	<Route path="/" component={ App }>
		<IndexRoute component={ List } />
		<Route path="detail/:repo" component={ Detail } />
		<Route path="user/:user" component={ User } />
	</Route>
);

export default routes;