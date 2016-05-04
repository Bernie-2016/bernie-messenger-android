import React from 'react-native';
import Route, {PropTypes} from 'react-native';
import {Actions, Scene} from 'react-native-router-flux';
import NavLogo from './logo';
import NavIcon from './icon';

// apparently react-native-router-flux does some funky shit..
// scenes are legit nothing other than a place for another module
// to read their props and build a route manifest. Same as if it was provided
// with an object... :|
// https://github.com/aksonov/react-native-router-flux/blob/master/src/Scene.js
export default class CustomScene extends React.Component {
  static defaultProps = {
    renderBackButton () {
      return (
        <NavIcon
          name="chevron-left"
          onPress={() => Actions.pop()}
        />
      );
    },
    renderTitle () {
      return <NavLogo />
    }
  };
  render () {
    return null;
  }
}
