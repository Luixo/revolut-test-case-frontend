const cutLastZero = input => {
	if (input.slice(input.length - 2) === '.0')
		return input.slice(0, input.length - 2);
	if (input.slice(input.length - 1) === '0')
		return input.slice(0, input.length - 1);
	return input;
};

export const to2 = (input, {
	needZeros = false,
	keepDot = false,
} = {}) => {
	input = input.toString();
	let value = parseFloat(input).toFixed(2);
	if (!needZeros)
		value = cutLastZero(cutLastZero(value));
	if (keepDot && input[input.length - 1] === '.')
		value = value + '.';
	return value.toString();
};

export const formatAmount = (value, previousValue = value) => {
	value = value.replace(/[^\d.]/g, '');
	if (value.split('').filter(a => a === '.').length > 1)
		value = previousValue;
	else if (value === '0.')
		return value;
	else if (value.length > 1 && value[0] === '0')
		value = Number(value).toString();
	else if (value === '.')
		value = '0.';
	else if (value === '0.00')
		value = '0.01';
	else {
		let [whole, decimal] = value.split('.');
		if (whole.length > 6)
			value = previousValue;
		else
			value = decimal === undefined ? whole : `${whole}.${decimal.slice(0, 2).replace(/(\d)0/, '$1')}`;
	}
	return value;
};

export const floor2 = input => {
	input = Number(input);
	return parseInt(input*100)/100;
};