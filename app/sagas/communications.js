import {NativeModules} from 'react-native';
import {takeEvery} from 'redux-saga';
import {call, fork, select} from 'redux-saga/effects';
import {contactSelector, assignmentSelector} from '../selectors/assignment';
import * as Types from '../actions/types';

const {CommunicationsModule} = NativeModules;

export function* callContact () {
  var contact = yield select(contactSelector);
  // @TODO - reference correct phone number, not just the initial
  yield call(CommunicationsModule.createPhoneCall, contact.phoneNumbers[0].raw);
}

export function* textContact ({textAction}) {
  var contact = yield select(contactSelector);
  var {textActions} = yield select(assignmentSelector);
  var textActionMatch = textActions.filter(text => text.id === textAction);
  var message = textActionMatch.length > 0 ? textActionMatch[0].messageContent : textActions[0].messageContent;
  // @TODO - reference correct phone number, not just the initial
  yield call(CommunicationsModule.createSMSMessage, contact.phoneNumbers[0].raw, message);
}

export function* watchCallContact () {
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
