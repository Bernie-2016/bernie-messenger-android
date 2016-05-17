export function transformContactEntity (contact) {
  return {
    id: contact.recordID,
    firstName: contact.givenName,
    lastName: contact.familyName,
    fullName: `${contact.givenName || ''} ${contact.familyName || ''}`,
    emailAddresses: contact.emailAddresses,
    phoneNumbers: contact.phoneNumbers.map(cleanPhoneNumber)
  };
}

function cleanPhoneNumber (phoneNumberEntry) {
  return {
    ...phoneNumberEntry,
    raw: phoneNumberEntry.number.replace(/[^0-9.]/g, '')
  };
}
