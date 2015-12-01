var React = require('react');
var _ = require('lodash');

var Header = require('./Header');
var PageHelper = require('../libs/PageHelper');

var DetailPage = React.createClass({
  statics: {
    fetchInitialData: function (params) {
      return Promise.resolve({key: 'NONE'});
    }
  },

  getInitialState: function () {
    return {
      
    };
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function () {

  },

  render: function () {

  }
});
