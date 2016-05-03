import React, {
  View,
  Image,
  StyleSheet
} from 'react-native';

const img = 'https://i.imgur.com/0WmCDfz.png';

export default function NavLogo () {
  return (
    <Image
      source={{uri: img}}
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
