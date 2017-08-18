import React, { Component } from 'react';
import glamorous from 'glamorous';

import { to2 } from '../../utils/format';
import SlickSlider, { className as slickClassName } from './CurrencySliderStyled';
import Input from './Input';

const CurrencyBox = glamorous.div({
	padding: 40,
	paddingBottom: 50,
});
const CurrencyBoxElement = glamorous.div({
	display: 'flex',
	justifyContent: 'space-between',
});
const Top = glamorous(CurrencyBoxElement)({
	fontSize: '4rem',
});
const Bottom = glamorous(CurrencyBoxElement)({});
const Hint = glamorous.div({});
const Code = glamorous.div({});

class Slider extends Component {
	componentDidMount() {
		this.componentWillReceiveProps(this.props, true);
	}
	componentWillReceiveProps(nextProps, forced = false) {
		const { currentCode: nextCode, currencies } = nextProps;
		const { currentCode: prevCode } = this.props;
		if (prevCode === nextCode && !forced)
			return;
		const nextIndex = currencies.findIndex(({ code }) => code === nextCode);

		if (this.refs && this.refs.slider)
		// Magic! Needed to be investigated. Breaks the width property of the carousel if invoked without setTimeout.
			setTimeout(() => this.refs.slider.slickGoTo(nextIndex), 0);
	}
	render() {
		const {
			currencies, amount, editable = false, user, hint, colored, withRectangle, currentCode,
			onChangeCurrency, onChangeAmount
		} = this.props;

		return (
			<SlickSlider
				arrows={false}
				className={slickClassName + (colored ? ' colored' : '') + (withRectangle ? ' with-rectangle' : '')}
			  dots={true}
			  initialSlide={currencies.findIndex(({ code }) => code === currentCode)}
				ref="slider"
			  afterChange={index => onChangeCurrency(currencies[index].code)}
			>
				{
					currencies.map(({ code, symbol }) => {
						return (
							<CurrencyBox key={code}>
								<Top>
									<Code>{code}</Code>
									<Input
										amount={amount.toString()}
										onChange={onChangeAmount}
										editable={editable}
									/>
								</Top>
								<Bottom>
									<Hint>You have {symbol}{to2(user.find(({ code: userCode }) => userCode === code).amount)}</Hint>
									<Hint>{hint ? hint({ to: code }) : ''}</Hint>
								</Bottom>
							</CurrencyBox>
						);
					})
				}
			</SlickSlider>
		);
	}
}

export default Slider;