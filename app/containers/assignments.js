import React, {
  ListView,
  PropTypes,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import * as AssignmentActions from '../actions/assignments';
import AssignmentRow from '../components/assignmentRow';
import Screen from '../components/screen';
import selector from '../selectors/assignments';

class Assignments extends React.Component {
  static propTypes = {
    assignments: PropTypes.array.isRequired,
    AssignmentActions: PropTypes.object.isRequired
  };
  constructor (props) {
    var dataSource;
    super(props);

    dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: dataSource.cloneWithRows([])
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.assignments !== nextProps.assignments) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.assignments)
      });
    }
  }

  selectAssignment (assignment) {
    this.props.AssignmentActions.selectAssignment(assignment.id);
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
});

const actions = dispatch => ({
  AssignmentActions: bindActionCreators(AssignmentActions, dispatch)
});

export default connect(selector, actions)(Assignments);
