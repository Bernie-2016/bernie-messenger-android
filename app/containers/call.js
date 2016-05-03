import React, {
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import * as AssignmentActions from '../actions/assignments';
import selector from '../selectors/assignment';
import Colors from '../constants/colors';
import Screen from '../components/screen';

class Call extends React.Component {
  constructor (props) {
    super(props);
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: dataSource.cloneWithRows(props.assignment.callActions)
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.assignment.callActions !== nextProps.assignment.callActions) {
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.assignment.callActions)
      });
    }
  }

  renderRow ({id, name, callScript}) {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.script}>{callScript}</Text>
      </View>
    )
  }

  render () {
    return (
      <Screen>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={callAction => this.renderRow(callAction)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.dispatch(AssignmentActions.callContact(this.props.contact.id))}
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

export default connect(selector)(Call);
