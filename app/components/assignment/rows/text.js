import React from 'react-native';
import AssignmentRow from './row';
import I18n from '../../../localization';

export default function TextRow ({contact, textAction, ...props}) {
  return (
    <AssignmentRow
      title={I18n.t('assignments.options.text.title')}
      text={textAction.name}
      icon="comment"
      {...props}
    />
  );
}
