import {fork} from 'redux-saga/effects';
import communicationsSaga from './communications';
import initializerSaga from './initializer';

export default function* rootSaga () {
  yield [
    fork(communicationsSaga),
    fork(initializerSaga)
  ];
}
