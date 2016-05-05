import React, {
  PropTypes,
  StyleSheet,
  View,
  Text
} from 'react-native';
import * as AssignmentActionType from '../../constants/assignmentActionTypes';
import Colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

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

HistoryRow.propTypes = {
  task: PropTypes.object.isRequired
};

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
      <Icon
        name={icon}
        size={24}
        color={Colors.Blue.Light}
      />
      <View style={styles.info}>
        <Text>{text}</Text>
        <Text>{time.fromNow()}</Text>
      </View>
    </View>
  );
}

HistoryRow.propTypes = CallRow.propTypes = TextRow.propTypes = {
  task: PropTypes.object.isRequired
};

Row.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  row: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  info: {
    marginLeft: 10
  }
});
