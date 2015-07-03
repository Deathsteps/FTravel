var React = require('react');

var Product = React.createClass({
    render: function () {
    	var data = this.props.data;
        return (
			<div className="product">
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
    }
});

module.exports = Product;