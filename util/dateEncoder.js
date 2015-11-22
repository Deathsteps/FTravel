var moment = require('moment');

exports.encode = function (dateStr) {
	return moment(dateStr).format('YYYYMMDD');
};

exports.decode = function (codedDate, type) {
	var year = codedDate.substring(0, 4);
	var month = codedDate.substring(4, 6);
	var day = codedDate.substring(6);

	var date = Date.parse(year + '-' + month + '-' + day);
	
	if(type === 'aspNet')
		return '/Date('+ (date.getTime() - 28799200) + ('+0800)/');
	else
		return date;
};