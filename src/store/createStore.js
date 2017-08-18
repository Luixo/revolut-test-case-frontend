import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux';
import { reducer } from './redux/index';

const history = createHistory();

const createReduxStore = (initialState = {}) => {
	const middleware = [thunk, routerMiddleware(history)];
	let composeEnhancers = compose;

	try {
		if (__DEV__)
			composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancers;
	} catch(e) {}

	return createStore(
		reducer,
		initialState,
		composeEnhancers(applyMiddleware(...middleware))
	);
};

export default createReduxStore;
export { history };
