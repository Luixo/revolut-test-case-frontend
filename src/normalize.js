import objectAssign from 'object-assign';
import rejectionTracking from 'promise/lib/rejection-tracking';
import es6Extenstions from 'promise/lib/es6-extensions';
import 'whatwg-fetch-importable';

Object.assign = objectAssign;

if (typeof Promise === 'undefined') {
	rejectionTracking.enable();
	window.Promise = es6Extenstions;
}
