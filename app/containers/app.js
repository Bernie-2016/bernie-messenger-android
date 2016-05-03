import React from 'react-native';
import {Provider} from 'react-redux';
import Router from './router';
import store from '../store';


export default function App () {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
