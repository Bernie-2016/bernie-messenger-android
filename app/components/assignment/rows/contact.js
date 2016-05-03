import React from 'react-native';
import AssignmentRow from './row';

export default function ContactRow ({contact, ...props}) {
  return (
    <AssignmentRow
      title="My Contact"
      text="Select a contact"
      {...props}
    />
  );
}
