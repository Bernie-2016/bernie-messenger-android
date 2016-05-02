import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import asyncMiddleware from './asyncMiddleware';
import reducers from '../reducers';
import sagas from '../sagas';

const createStoreWithMiddelware = applyMiddleware(
  asyncMiddleware,
  createLogger({
    predicate: () => __DEV__
  }),
  thunk
)(createStore);

const store = createStoreWithMiddelware(combineReducers(reducers));

export default store;
