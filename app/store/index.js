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

const reducer = combineReducers(reducers);

const storageWrappedReducers = storage.reducer(reducer);
const engine = filter(createStorageEngine('state'), [
  'assignmentHistory'
]);
const storageMiddleware = storage.createMiddleware(engine, [], [Types.CALL_CONTACT, Types.TEXT_CONTACT]);

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddelware = applyMiddleware(
  asyncMiddleware,
  sagaMiddleware,
  createLogger({
    predicate: () => __DEV__
  }),
  thunk,
  storageMiddleware
)(createStore);

const store = createStoreWithMiddelware(combineReducers(reducers));

const stateLoader = storage.createLoader(engine);
stateLoader(store)
  .then(newState => console.log('loaded state', newState))
  .catch(err => console.log('error loading state', err));

sagaMiddleware.run(sagas);

export default store;
