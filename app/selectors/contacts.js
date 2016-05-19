import {createSelector} from 'reselect';
import {transformContactEntity} from '../entities/transformers/contact';
import {LETTERS} from '../constants/letters';

const contactEntitiesSelector = state => state.entities.contact;

const contactsSelector = createSelector(
  contactEntitiesSelector,
  (contactEntities) => {
    return Object.keys(contactEntities)
    // map the collection of entities into transformed contact objects
    .map(contactId => transformContactEntity(contactEntities[contactId]))
    // flatten the collection into contacts-by-number
    .reduce((contacts, contact) => {
      var byNumber = contact.phoneNumbers.map(({number}) => ({
        ...contact,
        phoneNumber: number
      }));
      return contacts.concat(byNumber);
    }, [])
    // sort the collection by name
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
    })
    // transform the collection into a letter map
    .reduce((contactsByName, contact) => {
      var letter = contact.fullName.charAt(0);
      var contactsAtLetter;
      if (letter) {
        letter = letter.toUpperCase();
      }

      if (LETTERS.indexOf(letter) === -1) {
        letter = '#';
      }

      contactsAtLetter = contactsByName[letter] || [];

      return {
        ...contactsByName,
        [letter]: [...contactsAtLetter, contact]
      };
    }, {});
  }
);

export default createSelector(
  contactsSelector,
  (contacts) => ({contacts})
);
