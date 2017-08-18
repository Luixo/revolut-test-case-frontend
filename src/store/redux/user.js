import { currencies } from '../config';

const PREFIX = 'USER.';
const CHANGE_AMOUNT = PREFIX + 'CHANGE_AMOUNT';
const ADD_FAVOURITE = PREFIX + 'ADD_FAVOURITE';
const REMOVE_FAVOURITE = PREFIX + 'REMOVE_FAVOURITE';

const changeAmount = ({ code, amount }) => {
	return ({
		type: CHANGE_AMOUNT,
		code, amount,
	})
};
const addFavourite = ({ from, to }) => ({
	type: ADD_FAVOURITE,
	from, to
});
const removeFavourite = ({ index }) => ({
	type: REMOVE_FAVOURITE,
	index,
});

export const actions = {
	changeAmount,
	addFavourite,
	removeFavourite,
};

const handlers = {
	[CHANGE_AMOUNT]: (state, { code: inputCode, amount }) => {
		const index = state.cash.findIndex(({ code: stateCode }) => stateCode === inputCode);
		if (index === -1)
			return state;
		return ({
			...state,
			cash: [
				...state.cash.slice(0, index),
				{
					...state.cash[index],
					amount,
				},
				...state.cash.slice(index + 1),
			]
		});
	},
	[ADD_FAVOURITE]: (state, { from, to }) => {
		if (state.favouriteRates.find(({ from: fromExist, to: toExist }) => fromExist === from && toExist === to))
			return state;
		return ({
			...state,
			favouriteRates: [
				...state.favouriteRates,
				{ from, to },
			],
		})
	},
	[REMOVE_FAVOURITE]: (state, { index }) => ({
		...state,
		favouriteRates: [
			...state.favouriteRates.slice(0, index),
			...state.favouriteRates.slice(index + 1),
		]
	}),
};

const initialState = {
	cash: currencies.map(({ code }) => ({
		code,
		amount: 0,
	})),
	favouriteRates: [],
};
export const reducer = (state = initialState, action) => {
	const { type } = action;
	if (!handlers[type])
		return state;
	return handlers[type](state, action);
};