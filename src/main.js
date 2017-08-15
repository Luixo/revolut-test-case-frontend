import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';

import './normalize';
import Widget from './Widget';

const MOUNT_NODE = document.getElementById('root');

let render = () =>
	ReactDOM.render(
		<Widget example={'Hello!'}/>,
		MOUNT_NODE
	);

if (module.hot) {
	const renderApp = render;
	render = () => {
		try {
			renderApp();
		} catch (e) {
			console.error(e);
			ReactDOM.render(<RedBox error={e}/>, MOUNT_NODE);
		}
	};

	module.hot.accept(['./Widget'], () =>
			setImmediate(() => {
				ReactDOM.unmountComponentAtNode(MOUNT_NODE);
				render();
			})
	)
}

render();
