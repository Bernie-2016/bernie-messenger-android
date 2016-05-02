import React from 'react-native';
import {Provider, connect} from 'react-redux';
import Router from './router';
import store from '../store';

export default class AppRouter extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
