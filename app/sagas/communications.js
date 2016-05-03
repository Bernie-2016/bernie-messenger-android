import {NativeModules} from 'react-native';
import {takeEvery} from 'redux-saga';
import {call, fork, select} from 'redux-saga/effects';
import {contactSelector} from '../selectors/assignment';
import * as Types from '../actions/types';

const {CommunicationsModule} = NativeModules;

export function* callContact () {
  var contact = yield select(contactSelector);
  yield call(CommunicationsModule.createPhoneCall, contact.phoneNumbers[0].raw);
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
