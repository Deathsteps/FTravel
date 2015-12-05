var React = require('react');
var _ = require('lodash');

var Header = require('./Header');
var PageHelper = require('../libs/PageHelper');

class DetailPage extends React.Component {
  static fetchInitialData(params) {
    return Promise.resolve({key: 'NONE'});
  }

  constructor(props){
    super(props);
  }

  render() {

  }
}
