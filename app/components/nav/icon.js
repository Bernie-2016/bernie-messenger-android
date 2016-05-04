import React, {
  PropTypes,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NavIcon ({icon, onPress, ...props}) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress()}>
      <Icon
        name={icon}
        size={18}
        color={Colors.White}
        style={styles.icon}
        {...props}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 4,
    right: 2,
    padding: 8
  }
});

NavIcon.propTypes = {
  ...Icon.propTypes,
  onPress: PropTypes.func.isRequired
};
