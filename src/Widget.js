import React, { Component } from 'react';

class App extends Component {
	render() {
		const { example } = this.props;
		return <div>Test string: {example}</div>
	}
}

export default App;
