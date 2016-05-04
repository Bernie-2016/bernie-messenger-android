import React, {
  PropTypes,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NavIcon ({icon, onPress, position, ...props}) {
  return (
    <TouchableOpacity style={[styles.button, styles[position]]} onPress={() => onPress()}>
      <Icon
        name={icon}
        size={20}
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
    padding: 8
  },
  left: {
    left: 4
  },
  right: {
    right: 4
  }
});

NavIcon.propTypes = {
  ...Icon.propTypes,
  onPress: PropTypes.func.isRequired,
  position: PropTypes.oneOf(['left', 'right'])
};

NavIcon.defaultProps = {
  position: 'left'
};
