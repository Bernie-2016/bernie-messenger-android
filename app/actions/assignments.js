import * as Types from './types';
import * as AssignmentService from '../utils/assignments';
import {Actions as RouterActions} from 'react-native-router-flux';

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

export function callContact (contact) {
  return {
    type: Types.CALL_CONTACT,
    contact
  };
}

export function textContact (contact) {
  return {
    type: Types.TEXT_CONTACT,
    contact
  };
}

export function showConfirmation () {
  return {
    type: Types.SHOW_CALL_CONFIRM
  };
}

export function callConfirmed () {
  RouterActions.pop();
  return {
    type: Types.CALL_CONFIRMED
  };
}

export function callUnconfirmed () {
  RouterActions.pop();
  return {
    type: Types.CALL_UNCONFIRMED
  };
}
