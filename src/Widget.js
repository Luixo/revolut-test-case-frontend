import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import createStore, { history } from './store/createStore';
import Index from './components/Index';

class Widget extends Component {
	constructor(props) {
		super(props);
		const { apiKey } = props;
		this.state = {
			store: createStore({ apiKey })
		};
	}
	selectCash(prev, next) {
		return next.filter(({ code: nextCode, amount: nextAmount }) => {
			const prevAmount = prev.find(({ code: prevCode }) => nextCode === prevCode).amount;
			return prevAmount !== nextAmount;
		});
	}
	selectFavourites(prev, next) {
		return next.filter(({ from: nextFrom, to: nextTo }) => {
			const previousIncludes = prev.find(({ from: prevFrom, to: prevTo }) => prevFrom === nextFrom && prevTo === nextTo);
			return !previousIncludes;
		});
	}
	componentDidMount() {
		const { store } = this.state;

		let prevValue = store.getState().user;

		this.storeUnsubscribe = store.subscribe(() => {
			const { onChangeCash, onChangeFavourites } = this.props;
			const nextValue = store.getState().user;
			if (nextValue === prevValue)
				return;
			this.selectCash(prevValue.cash, nextValue.cash).forEach(onChangeCash);
			this.selectFavourites(prevValue.favouriteRates, nextValue.favouriteRates).forEach(onChangeFavourites);
			prevValue = nextValue;
		})
	}
	componentWillUnmount() {
		this.storeUnsubscribe();
	}
	render() {
		const { store } = this.state;
		const {
			user,
			onExit,
		} = this.props;

		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Index userInitialize={user} onExit={onExit}/>
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default Widget;
