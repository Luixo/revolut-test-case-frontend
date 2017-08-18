import { currencies } from '../config';
import { fetchRates } from '../api/openex';

const PREFIX = 'RATES.';
const REFRESH = PREFIX + 'REFRESH';

const refresh = () => async (dispatch, getState) => {
	const apiKey = getState().apiKey;
	for (let i = 0; i < currencies.length; i++) {
		const code = currencies[i].code;
		try {
			const result = await fetchRates(code, apiKey);
			dispatch({
				type: REFRESH,
				code,
				status: 0,
				data: result
			})
		}
		catch(e) {
			dispatch({
				type: REFRESH,
				code,
				status: 1,
			})
		}
	}
};

export const actions = {
	refresh,
};

const handlers = {
	[REFRESH]: (state, { code: inputCode, status, data }) => {
		const index = state.findIndex(({ code: stateCode }) => stateCode === inputCode);
		if (index === -1)
			return state;
		let rate = {
			...state[index],
			attemptTimestamp: new Date(),
			lastStatus: status,
		};
		if (status === 0) {
			rate.successTimestamp = new Date();
			rate.data = data;
		}
		return [
			...state.slice(0, index),
			rate,
			...state.slice(index + 1)
		]
	},
};

const initialState = currencies.map(({ code }) => ({
	code,
	attemptTimestamp: null,
	successTimestamp: null,
	lastStatus: null,
	data: {},
}));
export const reducer = (state = initialState, action) => {
	const { type } = action;
	if (!handlers[type])
		return state;
	return handlers[type](state, action);
};