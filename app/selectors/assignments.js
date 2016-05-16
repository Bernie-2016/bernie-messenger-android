import {createSelector} from 'reselect';
import moment from 'moment';

const assignmentEntitiesSelector = state => state.entities.assignment;

const assignmentsSelector = createSelector(
  assignmentEntitiesSelector,
  (assignmentEntities) => {
    return Object.keys(assignmentEntities)
      .map(assignmentId => ({
        ...assignmentEntities[assignmentId],
        expires: moment(assignmentEntities[assignmentId].expires)
      }))
  }
);

export default createSelector(
  assignmentsSelector,
  (assignments) => ({assignments})
);
