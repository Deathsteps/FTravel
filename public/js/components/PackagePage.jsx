import React, {Component} from 'react';
import _ from 'lodash';
import {setHeader} from './Header';
import PageHelper from '../libs/PageHelper';

export default class DetailPage extends Component {
  static fetchInitialData(params) {
    return Promise.resolve({key: 'NONE'});
  }

  constructor(props){
    super(props);
  }

  render() {

  }
}
