var React = require('react');

var Header = require('./Header');
var Product = require('./Product');
var ProductStore = require('../stores/ProductStore');

class ListPage extends React.Component {

	// Get initial data for server side rendering
	static fetchInitialData () {
		return new Promise(function (resolve, reject) {
			ProductStore.findByPage({PageIndex: 1})
				.then( (res) => resolve({key: ProductStore.LIST_CACHE_KEY, content: res.text()}) );
		});
	}

	constructor(props) {
    super(props);
    this.state = {
			data: ProductStore.findByPage({PageIndex: 1}, true)
		};
		this._onProductsFetched = (data) => this.setState({ data: data });
  }

	componentDidMount() {
		ProductStore.on('list-fetched', this._onProductsFetched);
		!this.state.data && ProductStore.findByPage({PageIndex: 1});
		
		Header.set({ title: 'List' });
	}

	componentWillUnmount() {
		ProductStore.off('list-fetched', this._onProductsFetched);
		window.scrollTo(0, 0);
	}

  render() {
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
		        		return (<Product data={item} key={item.ProductID}/>);
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
  }
}

module.exports = ListPage;