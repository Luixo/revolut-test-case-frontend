import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as viewReducer } from './view/index';
import { reducer as ratesReducer } from './rates';
import { reducer as userReducer } from './user';
import { reducer as currenciesReducer } from './currencies';

const reducer = combineReducers({
	router: routerReducer,
	view: viewReducer,
	rates: ratesReducer,
	user: userReducer,
	currencies: currenciesReducer,
	apiKey: (state = '') => state,
});

export { reducer };