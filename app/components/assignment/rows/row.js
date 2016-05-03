import React, {
  PropTypes,
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import Colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AssignmentRow ({enabled, icon, onPress, text, title}) {
  return (
    <TouchableHighlight
      onPress={() => onPress()}
      underlayColor={Colors.Gray.Light}
      style={styles.row}
    >
      <View style={styles.inset}>
        <Icon
          name={icon}
          size={18}
          color={enabled ? Colors.Green.Normal : Colors.Gray.Normal}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

AssignmentRow.propTypes = {
  enabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  row: {
    padding: 20,
    borderBottomColor: Colors.Gray.Light,
    borderBottomWidth: 1
  },
  inset: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    justifyContent: 'space-between',
    marginLeft: 20
  },
  title: {
    fontSize: 18,
    color: Colors.Red.Light
  },
  text: {
    fontSize: 22,
    color: Colors.Gray.Dark
  }
});
