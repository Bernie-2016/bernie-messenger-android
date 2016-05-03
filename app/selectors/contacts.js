import {createSelector} from 'reselect';
import {transformContactEntity} from '../entities/contact';

const contactEntitiesSelector = state => state.entities.contact;

const contactsSelector = createSelector(
  contactEntitiesSelector,
  (contactEntities) => {
    return Object.keys(contactEntities)
    .map(contactId => transformContactEntity(contactEntities[contactId]))
    .sort((a, b) => {
      if (a.firstName > b.firstName) {
        return 1;
      }
      if (a.firstName < b.firstName) {
        return -1;
      }
      if (a.lastName > b.lastName) {
        return 1;
      }
      if (a.lastName < b.lastName) {
        return -1;
      }
      return 0;
    });
  }
);

export default createSelector(
  contactsSelector,
  (contacts) => ({contacts})
);
