import React, {Component} from 'react';
import _ from 'lodash';
import {setHeader} from './Header';
import PageHelper from '../libs/PageHelper';
import PriceCalendar from './PriceCalendar';

export default class RoutePage extends Component {
	static fetchInitialData(params) {
		return Promise.resolve({key: 'NONE'});
	}

	componentDidMount() {
		setHeader({ title: 'Route' });
	}

	componentWillUnmount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
				<div className="route_page">
					<h1>选择日期与人数</h1>
					<PriceCalendar 
	  				productId={+this.props.params.productId}
	      		range={{Start:'2015-07-10', End:'2015-09-13'}}
	      	/>
	      		<div className="footer_bar">
	      		  <div className="num_selector">
	      		    <span>成人</span>
	      		    <span className="operater">-</span><input type="text" value="2"/><span className="operater">+</span>
	      		  </div>
	      		  <div className="num_selector">
	      		    <span>儿童</span>
	      		    <span className="operater">-</span><input type="text" value="0"/><span className="operater">+</span>
	      		  </div>
	      		  <div className="book"><button className="start_book btn">下一步</button></div>
	      		</div>
				</div>
			);
	}
}