import React from 'react-native';
import AssignmentRow from './row';

export default function ContactRow ({contact, ...props}) {
  return (
    <AssignmentRow
      title="My Contact"
      icon="user-plus"
      text={contact ? contact.fullName : 'Select a contact'}
      enabled={!!contact}
      {...props}
    />
  );
}
