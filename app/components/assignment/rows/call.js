import React from 'react-native';
import AssignmentRow from './row';

export default function CallRow ({contact, callAction, ...props}) {
  return (
    <AssignmentRow
      title="Call Person"
      text={contact ? callAction.callScript : callAction.name}
      icon="phone"
      enabled={!!contact}
      {...props}
    />
  );
}
