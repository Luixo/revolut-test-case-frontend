import React, { Component } from 'react';
import glamorous from 'glamorous';

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
	changeCurrency(code, way) {
		const { from, to } = this.state;
		if (way === this.constructor.FROM && to !== code)
			this.setState({ from: code });
		if (way === this.constructor.TO && from !== code)
			this.setState({ to: code });
	}
	render() {
		const { rates, currencies, style } = this.props;
		const { from, to, value } = this.state;

		let converted = '0';
		if (value) {
			const rateObject = rates.find(({ code }) => code === from);
			if (rateObject && rateObject.data[to]) {
				converted = Number(value) * rateObject.data[to];
			} else if (!rateObject) {
				const usdObject = rates.find(({ code }) => code === 'USD');
				converted = Number(value) * usdObject.data[to] / usdObject.data[from];
			} else {
				converted = '0';
			}
		}

		return (
			<Wrapper style={style}>
				<Input autofocus value={value} onChange={({ target: { value: nextValue }}) => {
					nextValue = formatAmount(nextValue, value);
					this.setState({ value: nextValue });
				}}/>
				<Dropdown value={from} onChange={({ target: { value }}) => this.changeCurrency(value, this.constructor.FROM)}>
					{Object.keys(currencies).map(code => {
						return <option key={code} value={code}>{code} - {currencies[code]}</option>
					})}
				</Dropdown>
				<h1 style={{ margin: 0 }}>⇓</h1>
				<Dropdown value={to} onChange={({ target: { value }}) => this.changeCurrency(value, this.constructor.TO)}>
					{Object.keys(currencies).map(code => {
						return <option key={code} value={code}>{code} - {currencies[code]}</option>
					})}
				</Dropdown>
				<Result>{to2(converted)}</Result>
			</Wrapper>
		);
	}
}

export default Converter;