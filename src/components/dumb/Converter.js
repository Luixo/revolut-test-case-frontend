import React, { Component } from 'react';
import glamorous from 'glamorous';

import { currencies as configCurrencies } from '../../store/config';
import { formatAmount, to2 } from '../../utils/format';

const Wrapper = glamorous.div({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});
const Dropdown = glamorous.select({
	margin: '15px 30px',
	fontSize: '1.5rem',
	color: 'white',
	background: 'rgba(0,0,0,0.2)',
	padding: 10,
	borderRadius: 5,
});
const Input = glamorous.input({
	fontSize: '3rem',
	margin: '10px 30px',
	color: 'white',
	background: 'none',
	border: 'none',
	padding: 5,
	maxWidth: '50%',
	textAlign: 'center',
	':focus': {
		outline: 0,
	}
});
const Result = glamorous.div({
	fontSize: '3rem',
	padding: 10,
});

class Converter extends Component {
	static FROM = 'FROM';
	static TO = 'TO';
	constructor(props) {
		super(props);
		this.state = { value: '1', from: 'USD', to: 'EUR' };
	}
	changeCurrency(target, way) {
		const { from, to } = this.state;
		const { options, value: code } = target;
		if (way === this.constructor.FROM) {
			this.setState({ from: code });
			if (to === code) {
				const currentTo = [...options].findIndex(({ value }) => value === to);
				const nextTo = options[currentTo === options.length - 1 ? 0 : currentTo + 1].value;
				this.setState({ to: nextTo });
			}
		}
		if (way === this.constructor.TO) {
			this.setState({ to: code });
			if (from === code) {
				const currentFrom = [...options].findIndex(({ value }) => value === from);
				const nextFrom = options[currentFrom === options.length - 1 ? 0 : currentFrom + 1].value;
				this.setState({ from: nextFrom });
			}
		}
	}
	render() {
		const { rates, currencies, style } = this.props;
		const { from, to, value } = this.state;

		let converted = 'Rate unavailable';
		if (value) {
			const rateObject = rates.find(({ code }) => code === from);
			if (rateObject && rateObject.data[to]) {
				converted = to2(Number(value) * rateObject.data[to]);
			} else if (!rateObject) {
				const foreignRate = configCurrencies.map(({ code: configCode }) => {
					const rateObject = rates.find(({ code }) => code === configCode);
					return rateObject.data[to] && rateObject.data[from] ? rateObject : null;
				}).find(a => a);
				if (foreignRate)
					converted = to2(Number(value) * foreignRate.data[to] / foreignRate.data[from]);
			}
		}

		return (
			<Wrapper style={style}>
				<Input autofocus value={value} onChange={({ target: { value: nextValue }}) => {
					nextValue = formatAmount(nextValue, value);
					this.setState({ value: nextValue });
				}}/>
				<Dropdown value={from} onChange={({ target }) => this.changeCurrency(target, this.constructor.FROM)}>
					{Object.keys(currencies).map(code => <option key={code} value={code}>{code} - {currencies[code]}</option>)}
				</Dropdown>
				<h1 style={{ margin: 0 }}>=</h1>
				<Result>{converted}</Result>
				<Dropdown value={to} onChange={({ target }) => this.changeCurrency(target, this.constructor.TO)}>
					{Object.keys(currencies).map(code => <option key={code} value={code}>{code} - {currencies[code]}</option>)}
				</Dropdown>
			</Wrapper>
		);
	}
}

export default Converter;