import React, {
  PropTypes,
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import * as Analytics from '../utils/analytics';
import * as AssignmentActions from '../actions/assignments';
import selector from '../selectors/assignment';
import Colors from '../constants/colors';
import I18n from '../localization';
import StyleRules from '../constants/styleRules';
import Screen from '../components/screen';
import ContactRow from '../components/assignment/rows/contact';
import CallRow from '../components/assignment/rows/call';
import TextRow from '../components/assignment/rows/text';

class Assignment extends React.Component {
  static propTypes = {
    AssignmentActions: PropTypes.object.isRequired,
    assignment: PropTypes.object.isRequired,
    completedCalls: PropTypes.array.isRequired,
    completedTexts: PropTypes.array.isRequired,
    contact: PropTypes.object
  };

  componentDidMount () {
    Analytics.logAssignment(this.props.assignment.id);
  }

  componentWillUnmount () {
    this.props.AssignmentActions.resetAssignment();
  }

  getTextRowText () {
    return this.props.assignment.textActions.length === 1 ?
      this.props.assignment.textActions[0].name :
      I18n.t('assignments.options.text.select');
  }

  tapTextRow () {
    var {assignment, contact} = this.props;
    if (assignment.textActions.length > 1) {
      // if there are more than one text actions, go to the selection screen
      RouterActions.text();
    } else {
      // if there is only one text action, go right ahead and text the contact
      const textAction = assignment.textActions[0];
      this.props.AssignmentActions.textContact(contact.id, assignment.id, textAction.id);
    }
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
              text={this.getTextRowText()}
              onPress={() => this.tapTextRow()}
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

const actions = dispatch => ({
  AssignmentActions: bindActionCreators(AssignmentActions, dispatch)
});

export default connect(selector, actions)(Assignment);
