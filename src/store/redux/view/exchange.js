import { currencies } from '../../config';

const PREFIX = 'VIEW.EXCHANGE.';
const CHANGE_CURRENCY_FROM = PREFIX + 'CHANGE_CURRENCY_FROM';
const CHANGE_CURRENCY_TO = PREFIX + 'CHANGE_CURRENCY_TO';
const CHANGE_CURRENCY_AMOUNT = PREFIX + 'CHANGE_CURRENCY_AMOUNT';

const changeCurrencyFrom = (code) => ({
	type: CHANGE_CURRENCY_FROM,
	code,
});
const changeCurrencyTo = (code) => ({
	type: CHANGE_CURRENCY_TO,
	code,
});
const changeCurrencyAmount = (amount) => ({
	type: CHANGE_CURRENCY_AMOUNT,
	amount,
});

export const actions = {
	changeCurrencyFrom,
	changeCurrencyTo,
	changeCurrencyAmount,
};

const handlers = {
	[CHANGE_CURRENCY_FROM]: (state, { code }) => ({
		...state,
		from: currencies.find(({ code: lookupCode }) => lookupCode === code) ? code : state.from,
		amount: null,
	}),
	[CHANGE_CURRENCY_TO]: (state, { code }) => ({
		...state,
		to: currencies.find(({ code: lookupCode }) => lookupCode === code) ? code : state.to,
	}),
	[CHANGE_CURRENCY_AMOUNT]: (state, { amount }) => ({
		...state,
		amount
	}),
};

const initialState = {
	from: currencies[0].code,
	to: (currencies[1] || currencies[0]).code,
	amount: null,
};
export const reducer = (state = initialState, action) => {
	const { type } = action;
	if (!handlers[type])
		return state;
	return handlers[type](state, action);
};