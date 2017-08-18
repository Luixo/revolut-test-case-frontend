const PREFIX = 'VIEW.EXCHANGE.';
const SELECT_CURRENCY = PREFIX + 'SELECT_CURRENCY';
const RESET = PREFIX + 'RESET';

const selectCurrency = (code) => ({
	type: SELECT_CURRENCY,
	code,
});
const reset = () => ({
	type: SELECT_CURRENCY,
});

export const actions = {
	selectCurrency,
	reset,
};

const handlers = {
	[SELECT_CURRENCY]: (state, { code }) => {
		if (!state.from && !state.to)
			return { from: code, to: null };
		if (!state.to)
			return { from: state.from, to: code };
		else
			return initialState;
	},
	[RESET]: () => initialState,
};

const initialState = {
	from: null,
	to: null,
};
export const reducer = (state = initialState, action) => {
	const { type } = action;
	if (!handlers[type])
		return state;
	return handlers[type](state, action);
};