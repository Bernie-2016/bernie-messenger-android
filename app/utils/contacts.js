import Contacts from 'react-native-contacts';

export function getContacts () {
  return new Promise((resolve, reject) => {
    Contacts.getAll((err, contacts) => {
      if (err) {
        reject(err);
      } else {
        resolve(contacts);
      }
    });
  });
}
