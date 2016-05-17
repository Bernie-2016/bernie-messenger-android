import React, {
  PropTypes,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import moment from 'moment';
import Colors from '../constants/colors';
import I18n from '../localization';

export default function AssignmentRow ({assignment, onPress}) {
  var expiry = getExpiry(assignment.expires);
  return (
    <TouchableHighlight
      onPress={() => onPress()}
      underlayColor={Colors.Gray.Light}
      style={styles.container}
    >
      <View>
        <Text style={styles.expires}>
          {I18n.t('assignments.expires', {expiry})}
        </Text>
        <Text style={styles.name}>{assignment.name}</Text>
      </View>
    </TouchableHighlight>
  );
}

function getExpiry (expires) {
  if (expires.isSame(moment(), 'day')) {
    return I18n.t('general.today');
  }
  return expires.format('MMMM, Do');
}

AssignmentRow.propTypes = {
  assignment: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  name: {
    color: Colors.Blue.Normal,
    fontSize: 20
  },
  expires: {
    color: Colors.Red.Light,
    fontSize: 16,
    marginBottom: 10
  }
});
