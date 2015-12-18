import PageHelper from '../libs/PageHelper';

var _el;

function init () {
	_el = document.querySelector('#js-header');

	var lnkBack = _el.querySelector('span.back');
	lnkBack.addEventListener('click', PageHelper.backward);
}

export function setHeader (opts) {
	if(!_el) init();
	// set title
	if(opts.title)
		_el.querySelector('h1').innerHTML = opts.title;
}