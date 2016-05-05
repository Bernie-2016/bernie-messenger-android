import {createSelector} from 'reselect';
import moment from 'moment';

const assignmentEntitiesSelector = state => state.entities.assignment;

const assignmentsSelector = createSelector(
  assignmentEntitiesSelector,
  (assignmentEntities) => {
    return Object.keys(assignmentEntities)
      .map(assignmentId => {
        var assignment = assignmentEntities[assignmentId];
        var expires = moment(assignment.expires);
        var expiresToday = expires.isSame(moment(), 'day');
        return {
          ...assignment,
          expires,
          expiresToday
        };
      });
  }
);

export default createSelector(
  assignmentsSelector,
  (assignments) => ({assignments})
);
