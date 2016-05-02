import React, {
  ListView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import * as AssignmentActions from '../actions/assignments';

class Assignments extends React.Component {
  componentDidMount () {
    this.props.dispatch(AssignmentActions.getAssignments());
    console.log('dis props', this.props);
  }
  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Das Assignments</Text>
      </View>
    );
  }
}

export default connect()(Assignments);
