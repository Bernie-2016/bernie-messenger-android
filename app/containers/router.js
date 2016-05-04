import React, {
  PropTypes,
  StyleSheet
} from 'react-native';
import {Actions, Router, Reducer} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Assignments from './assignments';
import Assignment from './assignment';
import Call from './call';
import Text from './text';
import ContactSelector from './contactSelector';
import History from './history';
import Scene from '../components/nav/scene';
import NavIcon from '../components/nav/icon';
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
      <Router createReducer={this.createReducer}>
        <Scene
          key="root"
          navigationBarStyle={styles.navBar}
        >
          <Scene
            key="assignments"
            renderBackButton={null}
            component={Assignments}
            initial
          />
          <Scene
            key="assignment"
            component={Assignment}
            renderRightButton={() => (
              <NavIcon
                name="history"
                position="right"
                onPress={() => Actions.history()}
              />
            )}
          />
          <Scene
            key="call"
            component={Call}
          />
          <Scene
            key="text"
            component={Text}
          />
          <Scene
            key="contactSelector"
            component={ContactSelector}
          />
          <Scene
            key="history"
            component={History}
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.Blue.Light
  }
});

export default connect()(Routes);
