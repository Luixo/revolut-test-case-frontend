import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';
import glamorous from 'glamorous';

import './normalize';
import './css';
import BGImage from './img/background.png';
import Widget from '../Widget';
import Info from './components/InfoBlock';

const MOUNT_NODE = document.getElementById('root');

const user = {
	cash: [{
		code: 'USD',
		amount: 10,
	}, {
		code: 'EUR',
		amount: 15,
	}, {
		code: 'GBP',
		amount: 0,
	}],
	favourites: [{
		from: 'USD',
		to: 'AUD',
	}, {
		from: 'USD',
		to: 'EUR',
	}]
};

const Root = glamorous.div({
	// TODO: move to static assets
	background: `url(${BGImage})`,
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'flex-start',
});

let infos = [];

let render = () =>
	ReactDOM.render(
		<Root>
			<Info user={user} infos={infos}/>
			<Widget
				apiKey={OPENEX_API_KEY}
				user={user}
				onChangeCash={({ code, amount }) => {
					user.cash = user.cash.map(({ code: userCode, amount: userAmount }, index) => {
						if (code !== userCode)
							return { code: userCode, amount: userAmount };
						infos.push([`UPD[${userCode}]: ${amount}`, 'amount ' + Number(new Date()) + index]);
						return { code, amount };
					});
					render();
				}}
				onChangeFavourites={({ from, to }, index) => {
					if (user.favourites.some(({ from: userFrom, to: userTo }) => userFrom === from && userTo === to))
						return;
					user.favourites.push({ from, to });
					infos.push([`FAV ${from}>${to}`, 'fav ' + Number(new Date()) + index]);
					render();
				}}
				onExit={() => {
					infos.push(['Exited!', 'exit ' + Number(new Date())]);
					render();
				}}
			/>
		</Root>,
		MOUNT_NODE
	);

if (module.hot) {
	const renderApp = render;
	render = (...input) => {
		try {
			renderApp(...input);
		} catch (e) {
			console.error(e);
			ReactDOM.render(<RedBox error={e}/>, MOUNT_NODE);
		}
	};

	module.hot.accept(['../Widget'], () =>
			setImmediate(() => {
				ReactDOM.unmountComponentAtNode(MOUNT_NODE);
				render();
			})
	)
}

render();
