import * as Types from '../actions/types';

export default function assignmentHistoryReducer (state = {}, action) {
  switch (action.type) {
    case Types.CALL_CONTACT:
      return mergeCallAction(state, action.assignment, action.contact, action.callAction);
    case Types.TEXT_CONTACT:
      return mergeTextAction(state, action.assignment, action.contact, action.textAction);
    default:
      return state;
  }
}

function mergeCallAction (state, assignment, contact, callAction) {
  var assignmentHistory = state[assignment] || {};
  var contactHistory = assignmentHistory[contact] || {callActions: {}, textActions: {}};
  return {
    ...state,
    [assignment]: {
      ...assignmentHistory,
      [contact]: {
        ...contactHistory,
        callActions: {
          ...contactHistory.callActions,
          [callAction]: Date.now()
        }
      }
    }
  };
}

function mergeTextAction (state, assignment, contact, textAction) {
  var assignmentHistory = state[assignment] || {};
  var contactHistory = assignmentHistory[contact] || {callActions: {}, textActions: {}};
  return {
    ...state,
    [assignment]: {
      ...assignmentHistory,
      [contact]: {
        ...contactHistory,
        textActions: {
          ...contactHistory.textActions,
          [textAction]: Date.now()
        }
      }
    }
  };
}
