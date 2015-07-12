var React = require('react');
var Promise = require('bluebird');
var _ = require('lodash');

var Header = require('./Header');
var ProductStore = require('../stores/ProductStore');

var DetailPage = React.createClass({
	statics: {
		fetchInitialData: function (params) {
			return new Promise(function (resolve, reject) {
				ProductStore.findOne({ProductID: params.id})
					.then( (res) => resolve({key: ProductStore.DETAIL_CHACHE_KEY, content: res.text()}) );
			});
		}
	},

	getInitialState: function () {
		return {
			productData: ProductStore.findOne({ProductID: this.props.params.id}, true)
		};
	},

	componentDidMount: function() {
		Header.set({ title: 'Detail' });
		ProductStore.on('detail-fetched', this._onDetailFetched);
		!this.state.productData && ProductStore.findOne({ProductID: this.props.params.id});
	},

	componentWillUnMount: function () {
		ProductStore.off('detail-fetched', this._onDetailFetched);
	},

	_onDetailFetched: function (data) {
		this.setState({ productData: data });
	},

	_renderFrees: function (productData) {
		if(productData.Frees && productData.Frees.length){
			return (
				<div className="frees">
				    <i className="tab_red">赠送</i>
				    {productData.Frees.map( (item) => { 
				     	return (<p>{item.Name}</p>);
				    })}
				</div>
			);
		}
	},

	_renderRecommends: function (productData) {
		if(productData.AdditionalInfos){
			var recommendData = _.find(productData.AdditionalInfos, {Type: 1});
			if(recommendData)
				return (
					<div className="info">
					  <h3>{recommendData.Title}</h3>
					  <ul className="info_list">
					  	{recommendData.Notifies[0].Description.map( (item) => {
					  		// insert raw html
					  		return (<li dangerouslySetInnerHTML={{__html: item}}></li>);
					  	})}
					  </ul>
					</div>
				);
		}
	},

	_renderFees: function (productData) {
		if(productData.AdditionalInfos){
			var feeData = _.find(productData.AdditionalInfos, {Type: 3});
			if(feeData){
				var feeTitle = feeData.Title;
				feeData = _(feeData.Notifies)
					.pluck('Description')
					.reduce(function (prev, curent) {
						return prev.concat(curent);
					}, []);
				return (
					<div className="info">
					  <h3>{feeTitle}</h3>
					  <ul className="info_list">
					  	{feeData.map( (item) => {
					  		return (<li>{item}</li>);
					  	})}
					  </ul>
					</div>	
				);
			}
		}
	},

	render: function () {
		var productData = this.state.productData;
		if(productData){

			var frees = this._renderFrees(productData); 
			var recommends = this._renderRecommends(productData);
			var fees = this._renderFees(productData);

			return (
				<div className="detail_page">
				  <div className="img">
				    <img src={productData.Images[0].LargeUrl} />
				  </div>
				  <h1>{productData.ProductName}</h1>
				  <div className="tags">
				    <span className="price">
				      <dfn>&yen;</dfn>{productData.Price.Current}
				    </span>
				    起/人
				  </div>
				  {frees}
				  {recommends}
				  <div className="resources">
				  </div>
				  {fees}
				</div>
			);
		}else{
			return (
				<div className="detail_page">
				  Loading......
				</div>
			);
		}
	}
});

module.exports = DetailPage;