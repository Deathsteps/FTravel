var React = require('react');

var Header = require('./Header');
var Product = require('./Product');
var ProductStore = require('../stores/ProductStore');

var ListPage = React.createClass({

	statics: {
		// Get initial data for server side rendering
		fetchInitialData: function () {
			return new Promise(function (resolve, reject) {
				ProductStore.findByPage({PageIndex: 1})
					.then( (res) => resolve({key: ProductStore.LIST_CACHE_KEY, content: res.text()}) );
			});
		}
	},

	getInitialState: function () {
      return {
          data: ProductStore.findByPage({PageIndex: 1}, true)
      };
  },

	componentDidMount: function() {
		ProductStore.on('list-fetched', this._onProductsFetched);
		!this.state.data && ProductStore.findByPage({PageIndex: 1});
		
		Header.set({ title: 'List' });
	},

	componentWillUnmount: function () {
		ProductStore.off('list-fetched', this._onProductsFetched);
		window.scrollTo(0, 0);
	},

    render: function () {
    	if(this.state.data){
    		// to do data paging

	    	return (
						<div className="list_page">
			        <section className="ads">Advertisements</section>
			        <section>
			          <a className="lnk_custom" href="#">Go To Custom Products &gt;&gt;</a>
			        </section>
			        <section className="recommend">
			        	{this.state.data.map((item) => {
			        		return (<Product data={item}/>);
			        	})}
			        </section>
	      		</div>
	        );	
    	}else{
    		return (
						<div className="list_page">
			        <section className="ads">Advertisements</section>
			        <section>
			          <a className="lnk_custom" href="#">Go To Custom Products &gt;&gt;</a>
			        </section>
			        <section className="recommend">
			        	Loading...
			        </section>
	      		</div>
	        );
    	}
    },

    _onProductsFetched: function (data) {
    	this.setState({ data: data });
    }
});

module.exports = ListPage;