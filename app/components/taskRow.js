import React, {
  PropTypes,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import Colors from '../constants/colors';
import StyleRules from '../constants/styleRules';

export default function TaskRow ({onPress, ...props}) {
  if (onPress) {
    return (
      <TouchableHighlight
        onPress={() => onPress()}
        underlayColor={Colors.Gray.Light}
        style={styles.container}
      >
        <View>
          <Row {...props} />
        </View>
      </TouchableHighlight>
    );
  }
  return (
    <Row {...props} />
  );
}

function Row ({title, message}) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

Row.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

TaskRow.propTypes = {
  ...Row.propTypes,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  row: {
    padding: StyleRules.ScreenPadding
  },
  title: {
    color: Colors.Red.Light,
    fontSize: StyleRules.FontSize.Small,
    marginBottom: 5
  },
  message: {
    color: Colors.Blue.Normal,
    fontSize: StyleRules.FontSize.Medium
  }
});
