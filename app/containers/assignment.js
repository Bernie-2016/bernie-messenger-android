import React, {
  PropTypes,
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import * as AssignmentActions from '../actions/assignments';
import selector from '../selectors/assignment';
import Colors from '../constants/colors';
import StyleRules from '../constants/styleRules';
import Screen from '../components/screen';
import ContactRow from '../components/assignment/rows/contact';
import CallRow from '../components/assignment/rows/call';
import TextRow from '../components/assignment/rows/text';

class Assignment extends React.Component {
  static propTypes = {
    assignment: PropTypes.object.isRequired,
    completedCalls: PropTypes.array.isRequired,
    completedTexts: PropTypes.array.isRequired,
    contact: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };
  componentWillUnmount () {
    this.props.dispatch(AssignmentActions.resetAssignment());
  }
  render () {
    var {
      assignment,
      completedCalls,
      completedTexts
    } = this.props;
    return (
      <Screen>
        <ScrollView>
          <View style={styles.heading}>
            <Text style={styles.title}>{assignment.name}</Text>
            <Text style={styles.byline}>{assignment.description}</Text>
            <Text style={styles.byline}>{assignment.instructions}</Text>
          </View>
          <ContactRow
            contact={this.props.contact}
            onPress={() => RouterActions.contactSelector()}
          />
          {assignment.callActions.length > 0 &&
            <CallRow
              contact={this.props.contact}
              callAction={assignment.callActions[0]}
              completed={completedCalls.length > 0}
              onPress={() => RouterActions.call()}
            />
          }
          {assignment.textActions.length > 0 &&
            <TextRow
              contact={this.props.contact}
              completed={completedTexts.length > 0}
              enabled={!!this.props.contact && (!assignment.requireCallFirst || completedCalls.length > 0)}
              textAction={assignment.textActions[0]}
              onPress={() => RouterActions.text()}
            />
          }
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: StyleRules.ScreenPadding
  },
  title: {
    fontSize: StyleRules.FontSize.Large,
    color: Colors.Blue.Normal
  },
  byline: {
    fontSize: StyleRules.FontSize.Medium,
    color: Colors.Gray.Dark,
    marginTop: 10
  }
});

export default connect(selector)(Assignment);
