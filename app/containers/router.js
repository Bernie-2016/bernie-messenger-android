'use strict';

import React, {PropTypes} from 'react-native';
import {Actions, Router, Reducer, Scene} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Assignments from './assignments';

const scenes = Actions.create(
  <Scene key="root">
    <Scene
      key="assignments"
      title="Assignments"
      initial={true}
      component={Assignments} />
  </Scene>
);

class Routes extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };
  createReducer (params) {
    const defaultReducer = Reducer(params);
    return (state, action) => {
      this.props.dispatch(action);
      return defaultReducer(state, action);
    };
  }
  render () {
    return (
      <Router
        createReducer={this.createReducer.bind(this)}
        scenes={scenes} />
    );
  }
}

export default connect()(Routes);
