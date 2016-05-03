import React from 'react-native';
import AssignmentRow from './row';

export default function CallRow ({contact, callAction, ...props}) {
  var text = callAction.name;
  if (contact) {
    text = callAction.callScript.replace(/\{\{contact\.firstName\}\}/g, contact.firstName);
    text = text.replace(/\{\{user\.firstName\}\}/g, 'Atticus');
  }
  return (
    <AssignmentRow
      title="Call Person"
      text={text}
      icon="phone"
      {...props}
    />
  );
}
