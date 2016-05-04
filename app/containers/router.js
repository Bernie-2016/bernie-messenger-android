import React, {
  PropTypes,
  StyleSheet
} from 'react-native';
import {Actions, Router, Reducer, Scene} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Assignments from './assignments';
import Assignment from './assignment';
import Call from './call';
import Text from './text';
import ContactSelector from './contactSelector';
import NavIcon from '../components/nav/icon';
import NavLogo from '../components/nav/logo';
import Colors from '../constants/colors';

class Routes extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };
  createReducer = params => {
    const defaultReducer = Reducer(params);
    return (state, action) => {
      this.props.dispatch(action);
      return defaultReducer(state, action);
    };
  };
  render () {
    return (
      <Router
        createReducer={this.createReducer}
        scenes={scenes}
      />
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.Blue.Light
  }
});

const scenes = Actions.create(
  <Scene
    key="root"
    sceneStyle={{backgroundColor: 'blue'}}
    navigationBarStyle={styles.navBar}
  >
    <Scene
      key="assignments"
      renderTitle={() => <NavLogo />}
      initial
      component={Assignments}
    />
    <Scene
      key="assignment"
      renderTitle={() => <NavLogo />}
      renderRightButton={() => <NavIcon name="history" onPress={() => {}} />}
      onRight={() => {}}
      component={Assignment}
    />
    <Scene
      key="call"
      renderTitle={() => <NavLogo />}
      component={Call}
    />
    <Scene
      key="text"
      renderTitle={() => <NavLogo />}
      component={Text}
    />
    <Scene
      key="contactSelector"
      renderTitle={() => <NavLogo />}
      component={ContactSelector}
    />
  </Scene>
);

export default connect()(Routes);
