'use strict';

import React, {View} from 'react-native';
import {Provider, connect} from 'react-redux'
import Router from './router';
import store from '../store';

const ReduxRouter = connect()(Router);

export default class AppRouter extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
