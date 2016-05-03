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

export function selectContact (contact) {
  return {
    type: Types.SELECT_CONTACT,
    contact
  };
}
