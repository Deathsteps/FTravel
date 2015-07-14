var _ = require('lodash');
var moment = require('moment');
var React = require('react');

var DATE = {
	TODAY: '今天',
	TOMORROW: '明天',
	DAY_AFTER_TOMORROW: '后天'
};

function calendar (year, month) {
	var date = moment({year: year, month: month, day: 1});
	date = date.subtract(date.get('day'), 'd');
	// https://github.com/moment/moment/issues/1754
	// The author of momentjs is considering make moment immutable.
	// Personally, I hate the mutable moment object, 
	// it makes me keep cloning the instance when an add or subtract action is called on it.
	var ret = [date.clone().toDate()];
	for (var i = 0; i < 41; i++) {
		ret.push(date.add(1, 'd').clone().toDate());
	}
	return ret;
}

function keyDates () {
	var date = new Date();
	//var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	var today = new Date(2015, 6, 10);

	date = new Date(+today);
	date.setDate(date.getDate() + 1);
	var tomorrow = date;

	date = new Date(+today);
	date.setDate(date.getDate() + 2);
	var dayAfterTomorrow = date;

	return [today, tomorrow, dayAfterTomorrow];
}

function calendarData (calendarDates, year, month) {

	var dates = keyDates();

	return calendarDates.map(function (date) {
		var ret = {
			date: date, 
			day: date.getDate(),
			belongToThisMonth: (date.getFullYear() === year && date.getMonth() === month),
			isToday: +dates[0] === +date,
			isTomorrow: +dates[1] === +date,
			isDayAfterTomorrow: +dates[2] === +date
			// to do holiday logic
		};
		ret.content = 
			ret.isToday ? DATE.TODAY
				: ret.isTomorrow ? DATE.TOMORROW
				: ret.isDayAfterTomorrow ? DATE.DAY_AFTER_TOMORROW
				: ret.day;
		return ret;
	});
}

var Calendar = React.createClass({
	getInitialState: function () {
		var year = this.props.year;
		var month = this.props.month;

		var data = calendarData(calendar(year, month), year, month);
		_.forEach(data, (item) => {
			var extraData = 
				_.find(this.props.extraData, (d) => {
					return +moment(d.Date).toDate() === +item.date;
				});
			_.extend(item, extraData);
		});

		return {
			data: data
		};
	},

	componentDidMount: function () {
		
	},

	componentWillUnMount: function () {
		
	},

	_renderTitle: function () {
		// Default Calendar Title
		return this.props.children ? this.props.children :
			(<div className="title">
				<span>{this.props.year + '-' + this.props.month}</span>
			</div>);		
	},

	render: function () {
		// To do:
		// If the dayComponent is not given, a default one should be provided.

		var title = this._renderTitle();

		return (
		<div className="calendar">
			<ul className="weekday">
			  <li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>
			</ul>
			{title}
			<ul className="days">
			  {this.state.data.map((item)=>{
			  	return React.createElement(this.props.dayComponent, {data: item});
			  })}
			</ul>
		</div>
        );
	}
});

module.exports = Calendar;