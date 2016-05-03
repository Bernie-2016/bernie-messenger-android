import React, {
  ListView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
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
        {this.props.confirmCall &&
        <View style={styles.overlay}>
          <View style={styles.overlayInset}>
            <View style={styles.overlayTitleContainer}>
              <Text style={styles.overlayTitle}>Was your call successful?</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.buttonGroupItem, {borderRightWidth: 1, borderRightColor: Colors.Gray.Light}]}
                onPress={() => this.props.dispatch(AssignmentActions.callConfirmed())}>
                  <Text style={styles.yes}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonGroupItem} onPress={() => this.props.dispatch(AssignmentActions.callUnconfirmed())}>
                <Text style={styles.no}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        }
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
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayInset: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: Colors.Gray.Light,
    borderRadius: 5
  },
  overlayTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray.Light
  },
  overlayTitle: {
    color: '#000',
    fontSize: 20
  },
  buttonGroup: {
    flexDirection: 'row'
  },
  buttonGroupItem: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  yes: {
    color: Colors.Green.Normal
  },
  no:{
    color: Colors.Red.Light
  }
});

export default connect(selector)(Call);
