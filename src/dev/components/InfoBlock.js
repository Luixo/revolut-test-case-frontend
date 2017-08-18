import React, { Component } from 'react';
import glamorous from 'glamorous';

const Info = glamorous.div({
	background: 'aliceblue',
	border: '2px black solid',
	padding: 5,
	display: 'flex',
	maxWidth: 600,
	overflow: 'hidden',
	height: 115,
});
const InfoBlock = glamorous.div({
	padding: '0 30px',
	overflow: 'auto',
});
const Title = glamorous.h2({
	margin: '7px 0',
});
const InfoLine = glamorous.p({
	margin: '3px 0',
});

class InfoElement extends Component {
	render() {
		const { user, infos } = this.props;
		if (user)
			return (
				<Info>
					<InfoBlock>
						<Title>Cash</Title>
						{user.cash.map(({code, amount}) => <InfoLine key={code}>{amount} {code}</InfoLine>)}
					</InfoBlock>
					<InfoBlock>
						<Title>Favourites</Title>
						{user.favourites.map(({from, to}) => <InfoLine key={from + '>' + to}>{from} > {to}</InfoLine>)}
					</InfoBlock>
					<InfoBlock>
						<Title>Info</Title>
						{infos.slice(Math.max(infos.length - 5, 0)).reverse().map(([ message, stamp ]) => <InfoLine key={stamp}>{message}</InfoLine>)}
					</InfoBlock>
				</Info>
			);
		return <Info>No data yet.</Info>;
	}
}

export default InfoElement;