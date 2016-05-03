import {createSelector} from 'reselect';

const assignmentEntitiesSelector = state => state.entities.assignment;
const selectedAssignmentSelector = state => state.assignment.assignment;

const assignmentSelector = createSelector(
  assignmentEntitiesSelector,
  selectedAssignmentSelector,
  (assignmentEntities, selectedAssignment) => assignmentEntities[selectedAssignment]
);

export default createSelector(
  assignmentSelector,
  (assignment) => ({assignment})
);
