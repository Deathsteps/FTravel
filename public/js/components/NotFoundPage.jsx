import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var NotFoundPage = React.createClass({
	mixins: [PureRenderMixin],

  render: function () {
  	var data = this.props.data;
    return (
				<div>
					<h1 style="color:red;">Page Not Found</h1>
					<p>"Not Found the target page, please check the address or return home page."</p>
				</div>
			);
  }
});

module.exports = NotFoundPage;