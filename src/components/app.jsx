//react
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

//library components
import LazyRoute from './lazy-route';

//styling
//TODO: styling import

//common components
import Footer from './footer.jsx';

const App = props => {
	//default render
	return (
		<BrowserRouter>
			<Switch>
				<LazyRoute exact path='/' component={() => import('./pages/builder')} />

				<LazyRoute path='*' component={() => import('./pages/not-found')} />
			</Switch>
			<Footer />
		</BrowserRouter>
	);
};

export default App;