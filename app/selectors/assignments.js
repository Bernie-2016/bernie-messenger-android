import {createSelector, createStructuredSelector} from 'reselect';
import moment from 'moment';

const assignmentIdsSelector = state => state.assignments.assignments;
const assignmentEntitiesSelector = state => state.entities.assignment;
const loadingSelector = state => state.assignments.loading;

const assignmentsSelector = createSelector(
  assignmentIdsSelector,
  assignmentEntitiesSelector,
  (assignments, assignmentEntities) => assignments.map(assignmentId => ({
    ...assignmentEntities[assignmentId],
    expires: moment(assignmentEntities[assignmentId].expires)
  }))
);

export default createStructuredSelector({
  assignments: assignmentsSelector,
  loading: loadingSelector
});
