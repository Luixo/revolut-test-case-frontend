import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { currencies, css } from '../store/config';
import { to2, floor2 } from '../utils/format';
import { actions as userActions } from '../store/redux/user';
import { actions as exchangeActions } from '../store/redux/view/exchange';

const Wrapper = glamorous.div({
	padding: '5px 10px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	height: css.navHeight,
});
const Button = glamorous.div(({ right, disabled }) => ({
	cursor: 'pointer',
	padding: 7,
	display: 'flex',
	alignItems: 'center',
	minWidth: 100,
	justifyContent: right ? 'flex-end' : 'initial',
	fontSize: '1.2rem',
	opacity: disabled ? 0.5 : 'initial',
}));
const FavouritesButton = glamorous(Button)({
	border: '1px solid white',
	background: 'rgba(0,0,0,0.2)',
	borderRadius: 5,
	justifyContent: 'space-around',
	':after': {
		content: '"▼"'
	}
});
const BackButton = glamorous(Button)({
	':before': {
		content: '"<"',
		fontSize: '145%',
		margin: 3,
	}
});
const AddButton = glamorous(Button)({
	':after': {
		content: '"+"',
		fontSize: '150%',
		margin: 3,
	}
});
const Title = glamorous.h3({
	margin: 0,
});

class Navigation extends Component {
	render() {
		const {
			exchangeFrom, exchangeTo, canExchange,
			from, to, rates, favourites,
			push, changeAmount, resetAmount, onExit,
		} = this.props;
		const { router: { route } } = this.context;
		const { pathname } = route.location || {};

		let backElement, forwardElement, centerElement;
		if (pathname.startsWith('/favourites/add')) {
			const back = () => push('./');
			backElement = <BackButton onClick={back}>Cancel</BackButton>;
			centerElement = <Title>{favourites.to ? 'Please wait..' : `Select currency ${favourites.from ? '2' : '1'}`}</Title>;
			forwardElement = <Button right/>;
		}
		else if (pathname.startsWith('/favourites')) {
			const back = () => push('../');
			const toAddFavourite = () => push('/favourites/add');
			backElement = <BackButton onClick={back}>Back</BackButton>;
			centerElement = <Title>Rates</Title>;
			forwardElement = <AddButton right onClick={toAddFavourite}/>;
		}
		else if (pathname.startsWith('/')) {
			const exit = onExit;
			const toFavourites = () => push('./favourites');
			let rateHint = 'Rate unavailable';
			const selectedRateFrom = rates.find(({ code }) => from === code);
			const symbolFrom = currencies.find(({ code }) => from === code).symbol;
			const symbolTo = currencies.find(({ code }) => to === code).symbol;
			if (selectedRateFrom.data[to])
				rateHint = `${symbolFrom}1 = ${symbolTo}${to2(selectedRateFrom.data[to])}`;

			backElement = <Button onClick={() => {
				exit();
			}}>Cancel</Button>;
			centerElement = <FavouritesButton onClick={toFavourites}>{rateHint}</FavouritesButton>;
			forwardElement = <Button right disabled={!canExchange} onClick={() => {
				if (!canExchange)
					return;
				changeAmount(exchangeFrom);
				changeAmount(exchangeTo);
				resetAmount();
				exit();
			}}>Exchange</Button>;
		}

		return (
			<Wrapper>
				{backElement}
				{centerElement}
				{forwardElement}
			</Wrapper>
		);
	}
}

Navigation.contextTypes = {
	router: PropTypes.object,
};

Navigation = connect(({ view: { exchange, favourites }, user: { cash }, rates }) => {
	const { from, to, amount } = exchange;
	const prevFrom = cash.find(({ code }) => code === from).amount;
	const prevTo = cash.find(({ code }) => code === to).amount;
	let nextFrom = prevFrom, nextTo = prevTo;
	let canExchange = false;
	if (amount && amount <= prevFrom) {
		nextFrom = floor2(prevFrom - amount);
		nextTo =  floor2(prevTo + floor2(amount / rates.find(({code}) => to === code).data[from]));
		canExchange = true;
	}
	if (!nextTo)
		canExchange = false;
	return {
		exchangeFrom: { code: from, amount: nextFrom, },
		exchangeTo: { code: to, amount: nextTo, },
		canExchange,
		rates,
		from, to, favourites,
	}
}, {
	push,
	changeAmount: userActions.changeAmount,
	resetAmount: () => exchangeActions.changeCurrencyAmount(0),
})(Navigation);

export default Navigation;