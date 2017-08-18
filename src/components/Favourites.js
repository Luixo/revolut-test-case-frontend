import React, { Component } from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RatesTab, { className as ratesTabClassName } from './dumb/RatesTabStyled';
import Converter from './dumb/Converter';
import { to2 } from '../utils/format';
import { css } from '../store/config';

const Wrapper = glamorous.div({
	height: css.height - css.navHeight,
	display: 'flex',
	flexDirection: 'column',
});
const AddButton = glamorous.div({
	border: '1px solid white',
	padding: '10px 40px',
	borderRadius: 5,
	alignSelf: 'center',
	textTransform: 'uppercase',
	margin: 15,
	cursor: 'pointer',
});
const Info = glamorous.div({
	padding: 20,
	alignSelf: 'center',
});
const Favourite = glamorous.div(({ index }) => ({
	background: 'rgba(0,0,0,0.2)',
	borderTop: index === 0 ? 'none' : '1px solid rgba(0,0,0,0.3)',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: 20,
}));
const Title = glamorous.div({
	fontSize: '2rem',
});
const Description = glamorous.div({
	textAlign: 'right',
});
const Rate = glamorous.div(({ small }) => ({
	display: 'inline-block',
	fontSize: small ? '0.8rem' : '1.5rem',
}));
const CurrencyName = glamorous.div({
	padding: '3px 0',
});
const Rates = glamorous.div({
	maxHeight: css.height - css.navHeight - 100,
	display: 'flex',
	flexDirection: 'column',
});
const FavouritesWrapper = glamorous.div({
	overflowY: 'auto',
});

class Favourites extends Component {
	render() {
		const { rates, favourites, currenciesNames, push } = this.props;
		const timestamp = rates[0].attemptTimestamp;

		return (
			<Wrapper>
				<RatesTab
					arrows={false}
					className={ratesTabClassName}
					dots={true}
					infinite={false}
					customPaging={index => <button>{index === 0 ? 'Rates' : 'Converter'}</button>}
					swipe={false}
				>
					<Rates>
						<FavouritesWrapper>
							{favourites.map(({ from, to }, index) => {
								let converted;
								const rateObject = rates.find(({ code }) => code === from);
								if (rateObject && rateObject.data[to]) {
									converted = rateObject.data[to];
								} else if (!rateObject) {
									const usdObject = rates.find(({ code }) => code === 'USD');
									converted = usdObject.data[to] / usdObject.data[from];
								} else {
									converted = '0';
								}
								const cut = to2(converted, { needZeros: true });
								const rate = [cut, converted.toString().slice(cut.length, cut.length + 2)];

								return (
									<Favourite key={`${from}>${to}`} index={index}>
										<Title>1 {from}</Title>
										<Description>
											<Rate>{rate[0]}</Rate><Rate small>{rate[1]}</Rate>
											<CurrencyName>{currenciesNames[to]}</CurrencyName>
										</Description>
									</Favourite>
								)
							})}
						</FavouritesWrapper>
						<AddButton onClick={() => push('/favourites/add')}>Add new currency</AddButton>
					</Rates>
					<Converter rates={rates} currencies={currenciesNames}/>
				</RatesTab>
				<Info>{timestamp ? `Updated at ${timestamp.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric' })} ${timestamp.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}` : 'Not updated yet'}</Info>
			</Wrapper>
		);
	}
}

Favourites = connect(({ rates, user: { favouriteRates }, currencies: currenciesNames }) => {
	return {
		rates,
		favourites: favouriteRates,
		currenciesNames,
	}
}, {
	push,
})(Favourites);

export default Favourites;