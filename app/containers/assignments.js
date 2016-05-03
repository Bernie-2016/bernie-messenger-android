import React, {
  ListView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import * as AssignmentActions from '../actions/assignments';
import * as ContactActions from '../actions/contacts';
import AssignmentRow from '../components/assignmentRow';
import Screen from '../components/screen';
import assignmentsSelector from '../selectors/assignments';

class Assignments extends React.Component {
  constructor (props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentDidMount () {
    this.props.dispatch(AssignmentActions.getAssignments());
    this.props.dispatch(ContactActions.getContacts());
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.assignments !== nextProps.assignments) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.assignments)
      });
    }
  }

  selectAssignment (assignment) {
    this.props.dispatch(AssignmentActions.selectAssignment(assignment.id));
    RouterActions.assignment();
  }

  renderRow (assignment) {
    return (
      <AssignmentRow
        assignment={assignment}
        onPress={() => this.selectAssignment(assignment)}
      />
    );
  }

  render () {
    return (
      <Screen>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={assignment => this.renderRow(assignment)}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    flex: 1
  }
})

export default connect(assignmentsSelector)(Assignments);
