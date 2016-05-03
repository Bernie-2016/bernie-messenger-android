import React, {
  ScrollView,
  ListView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import selector from '../selectors/assignment';
import Colors from '../constants/colors';
import StyleRules from '../constants/styleRules';
import Screen from '../components/screen';

class Assignment extends React.Component {
  render () {
    var {assignment} = this.props;
    return (
      <Screen>
        <View style={styles.heading}>
          <Text style={styles.title}>{assignment.name}</Text>
          <Text style={styles.byline}>{assignment.description}</Text>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: StyleRules.ScreenPadding
  },
  title: {
    fontSize: 24,
    color: Colors.Blue.Normal
  },
  byline: {
    fontSize: 18,
    color: Colors.Gray.Normal,
    marginTop: 10
  }
});

export default connect(selector)(Assignment);
