import React, { Component } from 'react';
import glamorous from 'glamorous';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';

import { actions as userActions } from '../store/redux/user';
import { actions as ratesActions } from '../store/redux/rates';
import { actions as currenciesActions } from '../store/redux/currencies';

import Navigation from './Navigation';
import Exchange from './Exchange';
import Favourites from './Favourites';
import AddFavourite from './AddFavourite';

const Wrapper = glamorous.div({
	width: '90%',
	overflow: 'hidden',
	margin: 'auto',
	background: '#2577FF',
	maxWidth: 600,
	color: 'white',
	textShadow: '0.4px 0.4px 0 black',
	borderRadius: 10,
});

class Index extends Component {
	constructor(props) {
		super(props);
		this.componentWillReceiveProps(props);
	}
	componentWillReceiveProps(nextProps) {
		const { userInitialize, user, initializeAmount, initializeFavourite } = nextProps;

		if (userInitialize) {
			if (userInitialize.cash)
				userInitialize.cash.forEach(({ code, amount } = {}) => {
					const userData = user.cash.find(({ code: userCode }) => code === userCode);
					if (!userData || userData.amount !== amount)
						initializeAmount({ code, amount });
				});
			if (userInitialize.favourites)
				userInitialize.favourites.forEach(({ from, to } = {}) => {
					const userData = user.favouriteRates.find(({ from: userFrom, to: userTo }) => from === userFrom && to === userTo);
					if (!userData)
						initializeFavourite({ from, to })
				});
		}
	}
	componentDidMount() {
		const { refreshCurrencies, refreshRates } = this.props;
		this.timer = setInterval(refreshRates, 10*1000);
		refreshCurrencies();
		refreshRates();
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		const { onExit } = this.props;

		return (
			<Wrapper>
				<Navigation onExit={onExit}/>
				<Switch>
					<Route path="/favourites/add" component={AddFavourite}/>
					<Route path="/favourites" component={Favourites}/>
					<Route exact path="/" component={Exchange}/>
				</Switch>
			</Wrapper>
		);
	}
}

Index = withRouter(connect(({ user }) => {
	return { user };
}, {
	refreshCurrencies: currenciesActions.refresh,
	refreshRates: ratesActions.refresh,
	initializeAmount: userActions.changeAmount,
	initializeFavourite: userActions.addFavourite,
})(Index));

export default Index;
