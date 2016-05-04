import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as storage from 'redux-storage';
import * as Types from '../actions/types';
import createStorageEngine from 'redux-storage-engine-reactnativeasyncstorage';
import filter from 'redux-storage-decorator-filter';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import asyncMiddleware from './asyncMiddleware';
import reducers from '../reducers';
import sagas from '../sagas';

// merge reducers into a tree
const reducer = combineReducers(reducers);

// compose the storage engine
const storageWrappedReducers = storage.reducer(reducer);
const engine = filter(createStorageEngine('state'), [
  'assignmentHistory'
]);
const storageMiddleware = storage.createMiddleware(engine, [], [Types.CALL_CONTACT, Types.TEXT_CONTACT]);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// compose all the middlewares
const createStoreWithMiddelware = applyMiddleware(
  asyncMiddleware,
  sagaMiddleware,
  createLogger({
    predicate: () => __DEV__
  }),
  thunk,
  storageMiddleware
)(createStore);

// compose the story with the middleware and reducers
const store = createStoreWithMiddelware(storageWrappedReducers);

// create a storage loader and hydrate the store
const stateLoader = storage.createLoader(engine);
stateLoader(store);

// boot the sagas
sagaMiddleware.run(sagas);

export default store;
