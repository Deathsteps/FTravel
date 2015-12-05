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

var CalendarDay = (props) => {
	var data = props.data;
	var now = Date.now();

	if(!data.belongToThisMonth){
		return (<li></li>);
	}else if(!data.MinPrice){
		return (<li><em className="disable">{data.content}</em></li>);
	}else{
		return (<li><em>{data.content}<i>&yen;{data.MinPrice.Current}</i></em></li>);
	}
}

class PriceCalendar extends React.Component {

	constructor(props){
		super(props);

		var data = 
			PriceStore.find({ProductID: props.productId, DateRange: props.range}, true);
		this.state = {
			data: data ? data.Prices : null,
			calendars: calendarInfos(props.range)
		};

		this._onPriceFetched = (data) => this.setState({data: data.Prices});
	}

	componentDidMount() {
		PriceStore.on('price-fetched', this._onPriceFetched);
		if(!this.state.data)
			PriceStore.find({ProductID: this.props.productId, 
				DateRange: this.props.range});
	}

	componentWillUnmount() {
		PriceStore.off('price-fetched', this._onPriceFetched);
	}

	// // manipulate DOM to switch calendars in an animate way
	// // switch to prev month
	// _onPrevMonth: function () {
	// 	React.findDOMNode(this.refs["calendar" + this._showIndex]).style.left = '';
	// 	this._showIndex --;
	// },
	// // switch to next month
	// _onNextMonth: function () {
	// 	this._showIndex = this._showIndex || 0;
	// 	this._showIndex ++;
	// 	React.findDOMNode(this.refs["calendar" + this._showIndex]).style.left = 0;
	// },

	render() {
		if(this.state.data){
			return (
					<div className="calendar_container">
						{this.state.calendars.map((item, i) => {
						return (
							<Calendar ref={"calendar" + i}
								dayComponent={CalendarDay} 
								extraData={this.state.data}
								year={item.year}
								month={item.month}>
							</Calendar>	
						);
						})}
					</div>
				);
		}else
			return (<strong>Loading......</strong>);
	}
}

module.exports = PriceCalendar;
