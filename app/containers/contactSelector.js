import React, {
  PropTypes,
  StyleSheet,
  TouchableHighlight,
  ListView,
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import selector from '../selectors/contacts';
import * as ContactActions from '../actions/contacts';
import Screen from '../components/screen';

class ContactSelector extends React.Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
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

  componentDidMount () {
    this.props.dispatch(ContactActions.getContacts());
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.contacts !== nextProps.contacts) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.contacts)
      });
    }
  }

  selectContact (contact) {
    this.props.dispatch(ContactActions.selectContact(contact.id));
    RouterActions.pop();
  }

  renderRow (contact) {
    return (
      <TouchableHighlight
        style={styles.row}
        onPress={() => this.selectContact(contact)}
      >
        <View style={styles.inset}>
          <Text style={styles.name}>{contact.fullName}</Text>
          <Text style={styles.phone}>{contact.phoneNumbers[0].number}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    return (
      <Screen>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={contact => this.renderRow(contact)}
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

  },
  name: {

  },
  phone: {

  }
});

export default connect(selector)(ContactSelector);
