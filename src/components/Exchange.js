import React, { Component } from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';

import { currencies, css } from '../store/config';
import { to2 } from '../utils/format';
import { actions as exchangeActions } from '../store/redux/view/exchange';
import Slider from './dumb/CurrencySlider';

const Wrapper = glamorous.div({
	margin: 'auto',
	background: 'linear-gradient(#1C69FF 10%, #1A58C1 90%)',
	height: css.height - css.navHeight,
	display: 'flex',
	flexDirection: 'column',
});

class Exchange extends Component {
	componentWillReceiveProps(nextProps) {
		const { changeCurrencyFrom, changeCurrencyTo } = nextProps;
		const { from: nextFrom, to: nextTo } = nextProps;
		const { from: prevFrom, to: prevTo } = this.props;
		if (nextFrom !== nextTo)
			return;
		const change = (next, fn) => {
			let selectedIndex = currencies.findIndex(({ code }) => code === next) + 1;
			if (selectedIndex >= currencies.length)
				selectedIndex = 0;
			fn(currencies[selectedIndex].code);
		};
		// Automatic scroll when currencies on top and bottom are the same.
		if (nextFrom !== prevFrom)
			change(nextTo, changeCurrencyTo);
		if (nextTo !== prevTo)
			change(nextFrom, changeCurrencyFrom);
	}
	render() {
		const {
			from, to, currentAmount, cash, rates,
			changeCurrencyFrom, changeCurrencyTo, changeCurrencyAmount,
		} = this.props;

		const hintGenerator = ({ to }) => {
			// $1 = £0.81
			let result = '';
			const selectedRateTo = rates.find(({ code }) => to === code);
			const symbolTo = currencies.find(({ code }) => to === code).symbol;
			const symbolFrom = currencies.find(({ code }) => from === code).symbol;
			if (selectedRateTo.data[from])
				result = `${symbolTo}1 = ${symbolFrom}${to2(selectedRateTo.data[from])}`;
			return result;
		};

		let currentConverted = '';
		const currentRateTo = rates.find(({ code }) => to === code);
		if (currentAmount && currentRateTo.data[from])
			currentConverted = to2(currentAmount / currentRateTo.data[from]);

		return (
			<Wrapper>
				<Slider
					currencies={currencies}
					currentCode={from}
					amount={currentAmount !== null ? currentAmount : ''}
				  editable
				  user={cash}
				  onChangeCurrency={changeCurrencyFrom}
				  onChangeAmount={changeCurrencyAmount}
					withRectangle
				/>
				<Slider
					currencies={currencies}
					currentCode={to}
					amount={currentConverted}
					user={cash}
					onChangeCurrency={changeCurrencyTo}
				  hint={hintGenerator}
				  colored
				/>
			</Wrapper>
		);
	}
}

Exchange = connect(({ rates, user: { cash }, view: { exchange } }) => {
	const { from, to, amount: currentAmount } = exchange;
	return {
		from, to, currentAmount,
		cash, rates,
	}
}, exchangeActions)(Exchange);

export default Exchange;