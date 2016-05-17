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
import Icon from 'react-native-vector-icons/FontAwesome';
import StyleRules from '../constants/styleRules';

export default function AssignmentRow ({assignment, onPress}) {
  var expiry = getExpiry(assignment.expires);
  return (
    <TouchableHighlight
      onPress={() => onPress()}
      underlayColor={Colors.Gray.Light}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.expires}>
            {I18n.t('assignments.expires', {expiry})}
          </Text>
          <Text style={styles.name}>{assignment.name}</Text>
        </View>
        <Icon
          name="chevron-right"
          style={styles.icon}
          size={18}
        />
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
    padding: StyleRules.ScreenPadding,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray.Light
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1
  },
  name: {
    color: Colors.Blue.Normal,
    fontSize: 16
  },
  expires: {
    color: Colors.Red.Light,
    fontSize: 14
  },
  icon: {
    color: Colors.Gray.Light
  }
});
