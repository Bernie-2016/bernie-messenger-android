import React, {
  ListView,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions as RouterActions} from 'react-native-router-flux';
import * as AssignmentActions from '../actions/assignments';
import selector from '../selectors/assignments';
import AssignmentRow from '../components/assignmentRow';
import Colors from '../constants/colors';
import I18n from '../localization';
import Icon from 'react-native-vector-icons/FontAwesome';
import Screen from '../components/screen';
import StyleRules from '../constants/styleRules';

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
        {this.props.loading &&
          <View style={styles.centeredContainer}>
            <Text style={styles.loading}>{I18n.t('general.loading')}</Text>
          </View>
        }
        {!this.props.loading && this.props.assignments.length > 0 &&
          <ListView
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={assignment => this.renderRow(assignment)}
          />
        }
        {!this.props.loading && this.props.assignments.length === 0 &&
          <View style={styles.centeredContainer}>
            <Icon name="inbox" size={82} color={Colors.Gray.Light} />
            <Text style={styles.emptyText}>{I18n.t('assignments.empty')}</Text>
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: StyleRules.ScreenPadding
  },
  emptyText: {
    color: Colors.Gray.Light,
    textAlign: 'center',
    fontSize: 18
  }
});

const actions = dispatch => ({
  AssignmentActions: bindActionCreators(AssignmentActions, dispatch)
});

export default connect(selector, actions)(Assignments);
