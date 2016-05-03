import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import asyncMiddleware from './asyncMiddleware';
import reducers from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddelware = applyMiddleware(
  asyncMiddleware,
  sagaMiddleware,
  createLogger({
    predicate: () => __DEV__
  }),
  thunk
)(createStore);

const store = createStoreWithMiddelware(combineReducers(reducers));

sagaMiddleware.run(sagas);

export default store;
