import * as Types from './types';
import * as ContactService from '../utils/contacts';

export function getContacts () {
  return {
    type: Types.GET_CONTACTS,
    asyncAction: () => ContactService.getContacts()
  };
}
