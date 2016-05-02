'use strict';

import React, {
  ListView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';

class Assignments extends React.Component {
  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Das Assignments</Text>
      </View>
    )
  }
}

export default connect()(Assignments);
