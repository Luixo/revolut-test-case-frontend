import { css } from 'glamor'
import Component from 'react-slick';

const SlickSlider = {
	flexGrow: 1,
	display: 'flex',
	position: 'relative',
};
const SlickTrack = {
	display: 'flex',
};
const SlickList = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
};
const SlickListColored = {
	background: '#1A58C1',
};
const rectangleSize = 30;
const SlickListWithRectangle = {
	height: rectangleSize,
	width: rectangleSize,
	position: 'absolute',
	bottom: -rectangleSize/2,
	left: `calc(50% - ${rectangleSize/2}px)`,
	background: 'linear-gradient(#1B61E1, #1B5FDF)',
	transform: 'rotate(45deg)',
	zIndex: 1,
	content: '""',
};
const SlickDots = {
	position: 'absolute',
	bottom: 0,
	width: '100%',
	textAlign: 'center',
	padding: 0,
	margin: '40px 0',
};
const SlickDot = {
	height: 20,
	width: 20,
	display: 'inline-block',
};
const SlickDotButton = {
	fontSize: 0,
	border: 0,
	background: '0 0',
	color: 'inherit',
};
const SlickDotButtonFocus = {
	outline: '0',
};
const SlickDotButtonBefore = {
	content: '"•"',
	fontSize: '1rem',
	opacity: '.25',
};
const SlickDotButtonBeforeActive = {
	opacity: '.75',
};
const className = 'slick-currency';
const global = (cls, obj) => css.global(`.${className} ${cls}`, obj);
css.global(`.${className}.slick-slider`, SlickSlider);
css.global(`.${className}.colored .slick-list`, SlickListColored);
css.global(`.${className}.with-rectangle:after`, SlickListWithRectangle);
global('.slick-track', SlickTrack);
global('.slick-list', SlickList);
global('.slick-dots', SlickDots);
global('.slick-dots li', SlickDot);
global('.slick-dots li button', SlickDotButton);
global('.slick-dots li button:focus', SlickDotButtonFocus);
global('.slick-dots li button:before', SlickDotButtonBefore);
global('.slick-dots li.slick-active button:before', SlickDotButtonBeforeActive);

export default Component;
export { className };
