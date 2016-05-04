import moment from 'moment';
import _ from 'lodash';
import {createSelector} from 'reselect';
import {transformContactEntity} from '../entities/transformers/contact';
import * as AssignmentActionType from '../constants/assignmentActionTypes';

const currentAssignmentSelector = state => state.assignment.assignment;
const assignmentEntitiesSelector = state => state.entities.assignment;
const contactEntitiesSelector = state => state.entities.contact;
const rawHistorySelector = state => state.assignmentHistory[state.assignment.assignment];

const historySelector = createSelector(
  rawHistorySelector,
  (history) => history || {}
);

// map the assignment reference to the entity
const assignmentSelector = createSelector(
  currentAssignmentSelector,
  assignmentEntitiesSelector,
  (currentAssignment, assignmentEntities) => assignmentEntities[currentAssignment]
);

// reduce all the contacts that have been contacted into a map of id -> entity
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

// reduce assignment call actions into an map of id -> action
const callActionMapSelector = createSelector(
  assignmentSelector,
  (assignment) => {
    return assignment.callActions.reduce((map, action) => ({
      ...map,
      [action.id]: action
    }), {});
  }
);

// reduce assignment text actions into an map of id -> action
const textActionMapSelector = createSelector(
  assignmentSelector,
  (assignment) => {
    return assignment.textActions.reduce((map, action) => ({
      ...map,
      [action.id]: action
    }), {});
  }
);

// transform the map of contacted contacts under the assignment into a list of completed tasks
const formattedHistorySelector = createSelector(
  historySelector,
  assignmentSelector,
  contactsSelector,
  callActionMapSelector,
  textActionMapSelector,
  (history, assignment, contacts, callActionMap, textActionMap) => {
    // transform contact map into collection of tasks
    var historyByContact = Object.keys(history).map(contactId => {
      var contactHistory = history[contactId];
      var contact = contacts[contactId];

      // transform call action map into a collection of completed call tasks
      var callHistory = Object.keys(contactHistory.callActions)
      .map(callId => ({
        callAction: callActionMap[callId],
        completed: moment.unix(contactHistory.callActions[callId] / 1000),
        type: AssignmentActionType.CALL
      }));

      // transform text action map into a collection of completed text tasks
      var textHistory = Object.keys(contactHistory.textActions)
      .map(textId => ({
        textAction: textActionMap[textId],
        completed: moment.unix(contactHistory.textActions[textId] / 1000),
        type: AssignmentActionType.TEXT
      }));

      // concat both task groups and include the contact and assignment
      return callHistory.concat(textHistory).map(item => ({
        contact,
        assignment,
        ...item
      }));
    });
    // flat map the chunked array into a flat list
    return _.flatMap(historyByContact);
  }
);

// sort the completed tasks by time
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
