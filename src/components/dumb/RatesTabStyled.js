import { css } from 'glamor'
import Component from 'react-slick';

const SlickTrack = {
	display: 'flex',
};
const SlickList = {
	flexGrow: 1,
};
const SlickDots = {
	textAlign: 'center',
	padding: 0,
	margin: 10,
	borderRadius: 5,
	border: '1px solid white',
	alignSelf: 'center',
};
const SlickDot = {
	height: 30,
	width: 140,
	display: 'inline-block',
};
const SlickDotButton = {
	color: 'inherit',
	width: '100%',
	height: '100%',
	border: 'none',
	background: 'none',
	cursor: 'pointer',
};
const SlickDotButtonActive = {
	background: 'white',
	color: '#2577FF',
};
const SlickDotButtonFocus = {
	outline: '0',
};
const SlickSlider = {
	flexGrow: 1,
	display: 'flex',
	position: 'relative',
	flexDirection: 'column-reverse',
};
const className = 'slick-rates';
const global = (cls, obj) => css.global(`.${className} ${cls}`, obj);
css.global(`.${className}.slick-slider`, SlickSlider);
global('.slick-list', SlickList);
global('.slick-track', SlickTrack);
global('.slick-dots', SlickDots);
global('.slick-dots li', SlickDot);
global('.slick-dots li button', SlickDotButton);
global('.slick-dots li button:focus', SlickDotButtonFocus);
global('.slick-dots li.slick-active button', SlickDotButtonActive);

export default Component;
export { className };
