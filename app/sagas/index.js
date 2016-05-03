import {fork} from 'redux-saga/effects';
import communicationsSaga from './communications';

export default function* rootSaga () {
  yield [
    fork(communicationsSaga)
  ];
}
