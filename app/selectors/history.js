import moment from 'moment';
import _ from 'lodash';
import {createSelector} from 'reselect';
import {transformContactEntity} from '../entities/transformers/contact';
import * as AssignmentActionType from '../constants/assignmentActionTypes';

const currentAssignmentSelector = state => state.assignment.assignment;
const assignmentEntitiesSelector = state => state.entities.assignment;
const contactEntitiesSelector = state => state.entities.contact;
const historySelector = state => state.assignmentHistory[state.assignment.assignment];

const assignmentSelector = createSelector(
  currentAssignmentSelector,
  assignmentEntitiesSelector,
  (currentAssignment, assignmentEntities) => assignmentEntities[currentAssignment]
);

const contactsSelector = createSelector(
  historySelector,
  contactEntitiesSelector,
  (history, contactEntities) => {
    return Object.keys(history).reduce((contacts, contactId) => ({
      ...contacts,
      [contactId]: transformContactEntity(contactEntities[contactId])
    }), {});
  }
);

const callActionMapSelector = createSelector(
  assignmentSelector,
  (assignment) => {
    return assignment.callActions.reduce((map, action) => ({
      ...map,
      [action.id]: action
    }), {});
  }
);

const textActionMapSelector = createSelector(
  assignmentSelector,
  (assignment) => {
    return assignment.textActions.reduce((map, action) => ({
      ...map,
      [action.id]: action
    }), {});
  }
);

const formattedHistorySelector = createSelector(
  historySelector,
  assignmentSelector,
  contactsSelector,
  callActionMapSelector,
  textActionMapSelector,
  (history, assignment, contacts, callActionMap, textActionMap) => {
    var historyByContact = Object.keys(history).map(contactId => {
      var contactHistory = history[contactId];
      var contact = contacts[contactId];

      var callHistory = Object.keys(contactHistory.callActions)
      .map(callId => ({
        callAction: callActionMap[callId],
        completed: moment.unix(contactHistory.callActions[callId] / 1000),
        type: AssignmentActionType.CALL
      }));

      var textHistory = Object.keys(contactHistory.textActions)
      .map(textId => ({
        textAction: textActionMap[textId],
        completed: moment.unix(contactHistory.textActions[textId] / 1000),
        type: AssignmentActionType.TEXT
      }));

      return callHistory.concat(textHistory).map(item => ({
        contact,
        assignment,
        ...item
      }));
    });
    return _.flatMap(historyByContact);
  }
);

const sortedHistorySelector = createSelector(
  formattedHistorySelector,
  (history) => history.sort(({completed: a}, {completed: b}) => {
    if (a.isAfter(b)) {
      return -1;
    }
    if (a.isBefore(b)) {
      return 1;
    }
    return 0;
  })
);

export default createSelector(
  sortedHistorySelector,
  (history) => ({history})
);
