import {NativeModules} from 'react-native';
import {takeEvery} from 'redux-saga';
import {call, fork, select} from 'redux-saga/effects';
import {contactSelector, assignmentSelector} from '../selectors/assignment';
import * as Analytics from '../utils/analytics';
import * as Types from '../actions/types';

const {CommunicationsModule} = NativeModules;

export function* callContact ({callAction}) {
  var contact = yield select(contactSelector);
  var assignment = yield select(assignmentSelector);
  yield call(Analytics.logCallAction, assignment.id, callAction);
  yield call(CommunicationsModule.createPhoneCall, contact.phoneNumber);
}

export function* textContact ({textAction}) {
  var contact = yield select(contactSelector);
  var assignment = yield select(assignmentSelector);
  var {textActions} = assignment;
  var textActionMatch = textActions.filter(text => text.id === textAction);
  var message = textActionMatch.length > 0 ? textActionMatch[0].messageContent : textActions[0].messageContent;
  yield call(Analytics.logTextAction, assignment.id, textAction);
  yield call(CommunicationsModule.createSMSMessage, contact.phoneNumber, message);
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
