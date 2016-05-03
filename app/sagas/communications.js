import {NativeModules} from 'react-native';
import {takeEvery} from 'redux-saga';
import {call, fork, put, select} from 'redux-saga/effects';
import {contactSelector} from '../selectors/assignment';
import * as Types from '../actions/types';
import * as AssignmentActions from '../actions/assignments';

const {CommunicationsModule} = NativeModules;

function delay (time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  })
}

export function* callContact () {
  var contact = yield select(contactSelector);
  yield call(CommunicationsModule.createPhoneCall, contact.phoneNumbers[0].raw);
  //yield call(delay, 2000);
  yield put(AssignmentActions.showConfirmation());
}

export function* textContact (action) {

}

export function* watchCallContact () {
  console.log('forked', Types.CALL_CONTACT)
  yield takeEvery(Types.CALL_CONTACT, callContact);
}

export function* watchTextContact () {
  yield takeEvery(Types.TEXT_CONTACT, textContact);
}

export default function* saga () {
  yield [
    fork(watchCallContact),
    fork(watchTextContact)
  ];
}
