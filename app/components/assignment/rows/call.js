import React from 'react-native';
import AssignmentRow from './row';
import I18n from '../../../localization';

export default function CallRow ({contact, callAction, ...props}) {
  return (
    <AssignmentRow
      title={I18n.t('assignments.options.call.title')}
      text={contact ? callAction.callScript : callAction.name}
      icon="phone"
      enabled={!!contact}
      {...props}
    />
  );
}
