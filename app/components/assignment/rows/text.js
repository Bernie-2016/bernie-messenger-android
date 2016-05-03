import React from 'react-native';
import AssignmentRow from './row';

export default function TextRow ({contact, textAction, ...props}) {
  return (
    <AssignmentRow
      title="Text Person"
      text={textAction.name}
      {...props}
    />
  );
}
