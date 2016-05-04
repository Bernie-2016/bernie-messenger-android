import React, {
  PropTypes,
  StyleSheet,
  View,
  Text
} from 'react-native';
import * as AssignmentActionType from '../../constants/assignmentActionTypes';

export default function HistoryRow ({task}) {
  switch (task.type) {
    case AssignmentActionType.CALL:
      return <CallRow task={task} />;
    case AssignmentActionType.TEXT:
      return <TextRow task={task} />;
    default:
      throw new TypeError(`Unknown task type ${task.type}`);
  }
}

function CallRow ({task: {contact, completed}}) {
  return (
    <Row
      icon="phone"
      text={`Called ${contact.firstName}`}
      time={completed}
    />
  );
}

function TextRow ({task: {contact, completed}}) {
  return (
    <Row
      icon="comment"
      text={`Texted ${contact.firstName}`}
      time={completed}
    />
  );
}

function Row ({icon, text, time}) {
  return (
    <View style={styles.row}>
      <Text>{text}</Text>
      <Text>{time.fromNow()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 20,

  }
});
