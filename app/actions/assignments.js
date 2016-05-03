import * as Types from './types';
import * as AssignmentService from '../utils/assignments';

export function getAssignments () {
  return {
    type: Types.GET_ASSIGNMENTS,
    asyncAction: () => AssignmentService.getAssignments()
  };
}
