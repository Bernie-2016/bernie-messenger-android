import React, {
  ListView,
  PropTypes,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AssignmentActions from '../actions/assignments';
import selector from '../selectors/assignment';
import Screen from '../components/screen';

class TextScreen extends React.Component {
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

  renderRow ({id: textId, name, messageContent}) {
    var {contact, assignment} = this.props;
    return (
      <TouchableOpacity onPress={() => this.props.AssignmentActions.textContact(contact.id, assignment.id, textId)}>
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

const actions = dispatch => ({
  AssignmentActions: bindActionCreators(AssignmentActions, dispatch)
});

export default connect(selector, actions)(TextScreen);
