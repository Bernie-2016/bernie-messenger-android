import React, {
  ListView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import * as AssignmentActions from '../actions/assignments';
import AssignmentRow from '../components/assignmentRow';
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
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.assignments !== nextProps.assignments) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.assignments)
      });
    }
  }

  renderRow (assignment) {
    return (
      <AssignmentRow
        assignment={assignment}
        onPress={assignment => this.selectAssignment(assignment)}
      />
    );
  }

  render () {
    return (
      <View style={{flex: 1, paddingTop: 60}}>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    flex: 1
  }
})

export default connect(assignmentsSelector)(Assignments);
