import React, {
  PropTypes,
  StyleSheet,
  View
} from 'react-native';
import Colors from '../constants/colors';

export default function Screen ({children, style, ...props}) {
  return (
    <View
      style={[styles.view, style]}
      {...props}
    >
      {children}
    </View>
  );
}

Screen.propTypes = {
  style: View.propTypes.style,
  children: PropTypes.node
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Colors.White
  }
});
