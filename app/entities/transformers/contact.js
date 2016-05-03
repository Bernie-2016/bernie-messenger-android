export function transformContactEntity (contact) {
  return {
    id: contact.recordID,
    firstName: contact.givenName,
    lastName: contact.familyName,
    fullName: `${contact.givenName} ${contact.familyName}`,
    emailAddresses: contact.emailAddresses,
    phoneNumbers: contact.phoneNumbers
  };
}
