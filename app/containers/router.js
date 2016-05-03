import React, {
  PropTypes,
  StyleSheet
} from 'react-native';
import {Actions, Router, Reducer, Scene} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Assignments from './assignments';
import Assignment from './assignment';
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
    navigationBarStyle={styles.navBar}>
    <Scene
      key="assignments"
      renderTitle={() => <NavLogo />}
      initial
      component={Assignments}
    />
    <Scene
      key="assignment"
      renderTitle={() => <NavLogo />}
      component={Assignment}
    />
  </Scene>
);

export default connect()(Routes);
