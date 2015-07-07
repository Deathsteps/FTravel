var React = require('react');

var PageHelper = require('../libs/PageHelper');

var Product = React.createClass({
    render: function () {
    	var data = this.props.data;
        return (
			<div className="product" onClick={this._onClick}>
	            <div className="pic">
	              <img src={data.PicURL}></img>
	            </div>
	            <div className="detail">
	              <h3>{data.ProductName}</h3>
	              <div>
	                <span className="price">
	                  <dfn>&yen;</dfn>{data.Price.Current}
	                </span>
	              </div>
	            </div>
	      	</div>
        );
    },

    _onClick: function () {
    	PageHelper.forward('/product/'+this.props.data.ProductID);
    }
});

module.exports = Product;