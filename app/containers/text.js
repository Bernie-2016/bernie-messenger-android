import React, {
  ListView,
  PropTypes,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import * as AssignmentActions from '../actions/assignments';
import selector from '../selectors/assignment';
import Screen from '../components/screen';

class TextScreen extends React.Component {
  static propTypes = {
    assignment: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    contact: PropTypes.object.isRequired
  };
  constructor (props) {
    var dataSource;
    super(props);

    dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(props.assignment.textActions)
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.assignment.textActions !== nextProps.assignment.textActions) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.assignment.textActions)
      });
    }
  }

  renderRow ({id, name, messageContent}) {
    return (
      <TouchableOpacity onPress={() => this.props.dispatch(AssignmentActions.textContact(this.props.contact.id, this.props.assignment.id, id))}>
        <View style={styles.row}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.script}>{messageContent}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render () {
    return (
      <Screen>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={textAction => this.renderRow(textAction)}
        />
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
  }
});

export default connect(selector)(TextScreen);
