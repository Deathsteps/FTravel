import React from 'react';
import PageHelper from '../libs/PageHelper';

var Product = ({data}) => (
  <div 
    className="product" 
    onClick={() => PageHelper.forward('/product/'+data.ProductID)}
  >
    <div className="pic">
      <img src={data.PicURL} />
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

module.exports = Product;