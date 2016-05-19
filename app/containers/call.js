import React, {
  ListView,
  PropTypes,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AssignmentActions from '../actions/assignments';
import selector from '../selectors/assignment';
import Screen from '../components/screen';
import TaskRow from '../components/taskRow';

class Call extends React.Component {
  static propTypes = {
    assignment: PropTypes.object.isRequired,
    contact: PropTypes.object.isRequired,
    AssignmentActions: PropTypes.object.isRequired
  };
  constructor (props) {
    var dataSource;
    super(props);

    dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(props.assignment.callActions)
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.assignment.callActions !== nextProps.assignment.callActions) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.assignment.callActions)
      });
    }
  }

  renderRow ({id: callId, name, callScript}) {
    var {assignment, contact} = this.props;
    return (
      <TaskRow
        onPress={() => this.props.AssignmentActions.callContact(contact.id, assignment.id, callId)}
        title={name}
        message={callScript}
      />
    );
  }

  render () {
    return (
      <Screen>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={data => this.renderRow(data)}
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

export default connect(selector, actions)(Call);
