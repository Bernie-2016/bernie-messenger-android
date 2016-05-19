import React, {
  View,
  Image,
  StyleSheet
} from 'react-native';

export default function NavLogo () {
  return (
    <Image
      source={require('../../assets/images/bernie_logo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 40,
    width: 80,
    alignSelf: 'center'
  }
});
