import { fetchCurrencies } from '../api/openex';

const PREFIX = 'CURRENCIES.';
const REFRESH = PREFIX + 'REFRESH';

const refresh = () => async (dispatch, getState) => {
	const apiKey = getState().apiKey;
		try {
			const result = await fetchCurrencies(apiKey);
			dispatch({
				type: REFRESH,
				data: result
			})
		}
		catch(e) {}
};

export const actions = {
	refresh,
};

const handlers = {
	[REFRESH]: (state, { data }) => data,
};

const initialState = {};
export const reducer = (state = initialState, action) => {
	const { type } = action;
	if (!handlers[type])
		return state;
	return handlers[type](state, action);
};