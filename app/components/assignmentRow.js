import React, {
  PropTypes,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import Colors from '../constants/colors';

export default function AssignmentRow ({assignment, onPress}) {
  return (
    <TouchableHighlight
      onPress={() => onPress()}
      underlayColor={Colors.Gray.Light}
      style={styles.container}
    >
      <View>
        {assignment.expiresToday && <Text style={styles.expires}>Expires Today</Text>}
        <Text style={styles.name}>{assignment.name}</Text>
      </View>
    </TouchableHighlight>
  );
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
    fontSize: 18,
    marginBottom: 10
  }
});
