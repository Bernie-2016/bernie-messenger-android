import {createSelector} from 'reselect';
import {transformContactEntity} from '../entities/contact';

const assignmentEntitiesSelector = state => state.entities.assignment;
const contactEntitiesSelector = state => state.entities.contact;
const selectedAssignmentSelector = state => state.assignment.assignment;
const selectedContactSelector = state => state.assignment.contact;
const calledSelector = state => state.assignment.called;
const textedSelector = state => state.assignment.texted;

export const assignmentSelector = createSelector(
  assignmentEntitiesSelector,
  selectedAssignmentSelector,
  (assignmentEntities, selectedAssignment) => assignmentEntities[selectedAssignment]
);

export const contactSelector = createSelector(
  contactEntitiesSelector,
  selectedContactSelector,
  (contactEntities, selectedContact) => {
    var contact = contactEntities[selectedContact];
    if (!contact) {
      return null;
    }
    return transformContactEntity(contact);
  }
);

export default createSelector(
  assignmentSelector,
  contactSelector,
  calledSelector,
  textedSelector,
  (assignment, contact, called, texted) => ({assignment, contact, called, texted})
);
