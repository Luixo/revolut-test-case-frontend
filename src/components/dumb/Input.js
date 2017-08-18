import React, { Component } from 'react';
import glamorous from 'glamorous';

import { to2, formatAmount } from '../../utils/format';

const StyledInput = glamorous.input({
	border: 'none',
	background: 'inherit',
	textAlign: 'right',
	outline: 'none',
	maxWidth: '70%',
	color: 'inherit',
});

class Input extends Component {
	render() {
		const { amount, onChange, editable } = this.props;
		let shownValue = '';
		if (amount)
			shownValue = (editable ? '-' : '+') + to2(amount, { keepDot: true });

		return (
			<StyledInput
				type="text"
				value={shownValue}
				onChange={({ target: { value }}) => onChange(formatAmount(value, shownValue.slice(1)))}
				readOnly={!editable}
				autofocus
			/>
		);
	}
}

export default Input;
