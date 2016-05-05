import * as Types from './types';
import * as AssignmentService from '../utils/assignments';

export function getAssignments () {
  return {
    type: Types.GET_ASSIGNMENTS,
    asyncAction: () => AssignmentService.getAssignments()
  };
}

export function selectAssignment (assignment) {
  return {
    type: Types.SELECT_ASSIGNMENT,
    assignment
  };
}

export function resetAssignment () {
  return {
    type: Types.RESET_ASSIGNMENT
  };
}

export function selectContact (contact) {
  return {
    type: Types.SELECT_CONTACT,
    contact
  };
}

export function callContact (contact, assignment, callAction) {
  return {
    type: Types.CALL_CONTACT,
    contact,
    assignment,
    callAction
  };
}

export function textContact (contact, assignment, textAction) {
  return {
    type: Types.TEXT_CONTACT,
    contact,
    assignment,
    textAction
  };
}
