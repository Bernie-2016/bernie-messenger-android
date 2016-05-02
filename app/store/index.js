import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';

const createStoreWithMiddelware = applyMiddleware(
  createLogger({
    predicate: () => __DEV__
  }),
  thunk
)(createStore);

const store = createStoreWithMiddelware(combineReducers(reducers));

export default store;
