import {createSelector} from 'reselect';

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

function transformContactEntity (contact) {
  return {
    id: contact.id,
    firstName: contact.givenName,
    lastName: contact.familyName,
    emailAddresses: contact.emailAddresses,
    phoneNumbers: contact.phoneNumbers
  };
}

export default createSelector(
  contactsSelector,
  (contacts) => ({contacts})
);
