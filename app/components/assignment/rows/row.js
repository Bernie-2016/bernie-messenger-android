import React, {
  PropTypes,
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import Colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import StyleRules from '../../../constants/styleRules';

export default function AssignmentRow ({completed, enabled, icon, onPress, text, title}) {
  return (
    <TouchableHighlight
      onPress={() => onPress()}
      disabled={!enabled}
      underlayColor={Colors.Gray.Light}
      style={styles.row}
    >
      <View style={styles.inset}>
        <Icon
          name={icon}
          size={18}
          color={completed ? Colors.Green.Normal : Colors.Gray.Normal}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        {!enabled && <View style={styles.disabledOverlay} />}
      </View>
    </TouchableHighlight>
  );
}

AssignmentRow.propTypes = {
  enabled: PropTypes.bool,
  completed: PropTypes.bool,
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
    fontSize: StyleRules.FontSize.Small,
    color: Colors.Red.Light
  },
  text: {
    fontSize: StyleRules.FontSize.Large,
    color: Colors.Gray.Dark
  },
  disabledOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
});
