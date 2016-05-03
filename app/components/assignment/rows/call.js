import React from 'react-native';
import AssignmentRow from './row';

export default function CallRow ({contact, callAction, ...props}) {
  return (
    <AssignmentRow
      title="Call Person"
      text={callAction.name}
      icon="phone"
      {...props}
    />
  );
}
