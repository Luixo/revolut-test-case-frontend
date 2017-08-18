import 'glamor/reset';
import { css } from 'glamor';

css.global('#root', {
	userSelect: 'none',
	cursor: 'default',
});
css.global('*', {
	minHeight: 0,
	minWidth: 0,
});
css.global('html,body', {
	height: '100%',
	overflow: 'hidden',
});