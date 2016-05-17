import React, {
  BackAndroid,
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
  componentDidMount () {
    this.backListener = BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());
  }
  componentWillUnmount () {
    this.backListener.remove();
  }
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
        <Scene key="root" navigationBarStyle={styles.navBar}>
          <Scene key="assignments" component={Assignments} renderBackButton={null} initial />
          <Scene key="assignment" component={Assignment} renderRightButton={historyIconRenderer} />
          <Scene key="call" component={Call} />
          <Scene key="text" component={Text} />
          <Scene key="contactSelector" component={ContactSelector} />
          <Scene key="history" component={History} />
        </Scene>
      </Router>
    );
  }
}

const historyIconRenderer = () => (
  <NavIcon
    name="history"
    position="right"
    onPress={() => Actions.history()}
  />
);

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.Blue.Light
  }
});

export default connect()(Routes);
