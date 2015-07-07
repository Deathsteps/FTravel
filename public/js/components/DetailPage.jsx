var React = require('react');
var Promise = require('bluebird');

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
		ProductStore.on('detail-fetched', this._onDetailFetched);
		!this.state.productData && ProductStore.findOne({ProductID: this.props.params.id});
	},

	componentWillUnMount: function () {
		ProductStore.off('detail-fetched', this._onDetailFetched);
	},

	_onDetailFetched: function (data) {
		this.setState({ productData: data });
	},

	render: function () {
		var productData = this.state.productData;
		if(productData){
			return (
				<div className="detail_page">
				  <div className="product">
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
				    <div className="desc">
				      <i className="tab_red">赠送</i>
				      {productData.Frees.map( (item) => { 
				      	return (<p>{item.Name}</p>);
				      })}
				    </div>
				  </div>
				  <div className="hotels"></div>
				  <div className="flights"></div>
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