import { combineReducers } from 'redux';
import { reducer as exchangeReducer } from './exchange';
import { reducer as favouritesReducer } from './favourites';

const reducer = combineReducers({
	exchange: exchangeReducer,
	favourites: favouritesReducer,
});
export { reducer };