import React, {
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
  render () {
    var {assignment} = this.props;
    return (
      <Screen>
        <ScrollView>
          <View style={styles.heading}>
            <Text style={styles.title}>{assignment.name}</Text>
            <Text style={styles.byline}>{assignment.description}</Text>
          </View>
          <ContactRow
            contact={this.props.contact}
            onPress={() => RouterActions.contactSelector()}
          />
          {assignment.callActions.length > 0 &&
            <CallRow
              contact={this.props.contact}
              callAction={assignment.callActions[0]}
              enabled={this.props.called}
              onPress={() => this.props.dispatch(AssignmentActions.callContact(this.props.contact.id))}
            />
          }
          {assignment.textActions.length > 0 &&
            <TextRow
              contact={this.props.contact}
              enabled={this.props.texted}
              textAction={assignment.textActions[0]}
              onPress={() => this.props.dispatch(AssignmentActions.textContact(this.props.contact.id))}
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
    fontSize: 24,
    color: Colors.Blue.Normal
  },
  byline: {
    fontSize: 18,
    color: Colors.Gray.Dark,
    marginTop: 10
  }
});

export default connect(selector)(Assignment);
