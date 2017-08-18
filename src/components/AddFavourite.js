import React, { Component } from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { actions as favouritesActions} from '../store/redux/view/favourites';
import { actions as userActions } from '../store/redux/user';
import { css } from '../store/config';

const Wrapper = glamorous.div({
	height: css.height - css.navHeight,
	display: 'flex',
	flexDirection: 'column',
});
const Search = glamorous.input({
	margin: 10,
	borderRadius: 5,
	border: 0,
	padding: 10,
	textAlign: 'center',
});
const FavouritesList = glamorous.div({
	padding: '0 15px',
	height: '100%',
	overflowY: 'auto',
	fontSize: '1.2rem',
});
const FavouriteElement = glamorous.div(({ index, selected }) => ({
	borderTop: index === 0 ? 'none': '1px solid white',
	padding: '10px 0',
	cursor: 'pointer',
	opacity: selected ? 0.5 : 'inherit',
	position: 'relative',
	':after':
		selected ? {
			content: '"✓"',
			position: 'absolute',
			right: 0,
		} : {}
}));

class AddFavourite extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
	}
	componentDidMount() {
		const { reset } = this.props;
		reset();
	}
	componentWillReceiveProps(nextProps) {
		const { favourites, push, addFavourite } = nextProps;
		if (!favourites.to)
			return;
		addFavourite(favourites);
		push('/favourites');
	}
	render() {
		const { currencies, selectCurrency, favourites } = this.props;
		const { filtered, value } = this.state;

		const list = filtered || currencies;

		return (
			<Wrapper>
				<Search
					placeholder="🔍Search"
					value={value}
					onChange={({ target: { value }}) => {
						const misMatches = value.split('').map((_, i) => new RegExp(value.slice(0, i) + '.?' + value.slice(i + 1), 'i'));
						const filtered = Object.keys(currencies).filter(code => {
							// TODO: improve performance
							const name = currencies[code];
							if (code.includes(value) || name.includes(value))
								return true;
							if (misMatches.some(reg => reg.test(code) || reg.test(name)))
								return true;
							return false;
						}).reduce((memo, code) => {
							memo[code] = currencies[code];
							return memo;
						}, {});
						this.setState({ filtered, value });
					}}
				/>
				<FavouritesList>
					{Object.keys(list).map((code, index) =>
						<FavouriteElement
							index={index}
							key={code}
							selected={favourites.from === code}
							onClick={() => {
								if (favourites.from === code)
									return;
								selectCurrency(code);
								this.setState({ filtered: null, value: '' });
							}}
						>{code} - {list[code]}</FavouriteElement>
					)}
				</FavouritesList>
			</Wrapper>
		);
	}
}

const { reset, selectCurrency } = favouritesActions;
const { addFavourite } = userActions;

AddFavourite = connect(({ view: { favourites }, currencies }) => ({
	currencies, favourites,
}), {
	push,	reset, selectCurrency, addFavourite
})(AddFavourite);

export default AddFavourite;