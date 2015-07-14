var React = require('react');
var moment = require('moment');

var PriceStore = require('../stores/PriceStore');
var Calendar = require('./Calendar');

function calendarInfos (dateRange) {
	var date = moment(dateRange.Start);
	var end = moment(dateRange.End);

	var ret = [];
	for (var i = 0; i < 3; i++) {
		ret.push({
			year    : date.get('year'),
			month   : date.get('month'),
			isFirst : i === 0,
			isLast  : i === 2
		});
		if(date.isSame(end, 'month')){
			ret.isLast = true;
			break; // first comparison
		}
		date.add(1, 'month');
	}

	return ret;
}

var CalendarDay = React.createClass({
	render: function () {
		var data = this.props.data;
		var now = Date.now();

		if(!data.belongToThisMonth){
			return (<li></li>);
		}else if(!data.MinPrice){
			return (<li><em className="disable">{data.content}</em></li>);
		}else{
			return (<li><em>{data.content}<i>&yen;{data.MinPrice.Current}</i></em></li>);
		}
	}
});

var CalendarTitle = React.createClass({
	render: function () {
		var prev, next;
		prev = this.props.onPrev ? 
			<a className="prev" onClick={this.props.onPrev}>&lt;</a> :
			<a className="prev disable">&lt;</a>;
		next = this.props.onNext ?
			<a className="next" onClick={this.props.onNext}>&gt;</a> :
			<a className="next disable">&gt;</a>;
		return (
			<div className="title">
				{prev}<span>{this.props.content}</span>{next}
			</div>
		);
	}
});

var PriceCalendar = React.createClass({

	getInitialState: function () {
		return {
			data: null,
			calendars: calendarInfos(this.props.range)
		}
	},

	componentDidMount: function () {
		PriceStore.on('price-fetched', this._onPriceFetched);
		PriceStore.find({ProductID: this.props.productId, 
			DateRange: this.props.range});
	},

	componentWillUnMount: function () {
		PriceStore.off('price-fetched', this._onPriceFetched);
	},

	_onPriceFetched: function (data) {
		this.setState({
			data: data
		});
	},

	// manipulate DOM to switch calendars in an animate way
	// switch to prev month
	_onPrevMonth: function () {
		React.findDOMNode(this.refs["calendar" + this._showIndex]).style.left = '';
		this._showIndex --;
	},
	// switch to next month
	_onNextMonth: function () {
		this._showIndex = this._showIndex || 0;
		this._showIndex ++;
		React.findDOMNode(this.refs["calendar" + this._showIndex]).style.left = 0;
	},

	render: function () {
		if(this.state.data){
			return (
				<div className="calendar_container">
					{this.state.calendars.map((item, i) => {
					var props = { content: item.year + '年' + (item.month + 1) + '月' };
					!item.isFirst && (props.onPrev = this._onPrevMonth);
					!item.isLast && (props.onNext = this._onNextMonth);
					return (
						<Calendar ref={"calendar" + i}
							dayComponent={CalendarDay} 
							extraData={this.state.data}
							year={item.year}
							month={item.month}>
							<CalendarTitle {...props}/>
						</Calendar>	
					);
					})}
				</div>
			);
		}else
			return (<strong>Loading......</strong>);
	}
});

module.exports = PriceCalendar;
