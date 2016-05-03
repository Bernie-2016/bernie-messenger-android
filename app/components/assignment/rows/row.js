import React, {
  PropTypes,
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import Colors from '../../../constants/colors';

export default function AssignmentRow ({title, text, icon, onPress}) {
  return (
    <TouchableHighlight
      onPress={() => onPress()}
      underlayColor={Colors.Gray.Light}
      style={styles.row}
    >
      <View style={styles.inset}>
        <Text style={styles.icon}>I</Text>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

AssignmentRow.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  //icon: PropTypes.text.isRequired,
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
    justifyContent: 'space-between'
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
