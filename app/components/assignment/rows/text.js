import React from 'react-native';
import AssignmentRow from './row';
import I18n from '../../../localization';

export default function TextRow ({contact, ...props}) {
  return (
    <AssignmentRow
      title={I18n.t('assignments.options.text.title')}
      icon="comment"
      {...props}
    />
  );
}
