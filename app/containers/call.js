import React, {
  ListView,
  PropTypes,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AssignmentActions from '../actions/assignments';
import selector from '../selectors/assignment';
import Colors from '../constants/colors';
import Screen from '../components/screen';

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

  renderRow ({name, callScript}) {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.script}>{callScript}</Text>
      </View>
    );
  }

  render () {
    var {assignment, contact} = this.props;
    var callAction = assignment.callActions[0];
    return (
      <Screen>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={data => this.renderRow(data)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.AssignmentActions.callContact(contact.id, assignment.id, callAction.id)}
        >
          <Text style={styles.buttonText}>Call</Text>
        </TouchableHighlight>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    flex: 1
  },
  row: {
    padding: 20
  },
  title: {
    fontSize: 22
  },
  script: {
    fontSize: 18
  },
  button: {
    backgroundColor: Colors.Blue.Normal,
    padding: 10
  },
  buttonText: {
    fontSize: 16,
    color: Colors.White
  }
});

const actions = dispatch => ({
  AssignmentActions: bindActionCreators(AssignmentActions, dispatch)
});

export default connect(selector, actions)(Call);
