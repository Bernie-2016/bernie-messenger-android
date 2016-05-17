import React, {
  ListView,
  StyleSheet,
  PropTypes,
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import selector from '../selectors/history';
import Colors from '../constants/colors';
import HistoryRow from '../components/historyRow';
import I18n from '../localization';
import Icon from 'react-native-vector-icons/FontAwesome';
import Screen from '../components/screen';
import StyleRules from '../constants/styleRules';

class History extends React.Component {
  static propTypes = {
    history: PropTypes.array.isRequired
  };
  constructor (props) {
    var dataSource;
    super(props);

    dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.history)
    };
  }

  render () {
    return (
      <Screen>
        {this.props.history.length > 0 &&
          <ListView
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={action => <HistoryRow task={action} />}
          />
        }
        {this.props.history.length === 0 &&
          <View style={styles.emptyContainer}>
            <Icon name="inbox" size={82} color={Colors.Gray.Light} />
            <Text style={styles.emptyText}>{I18n.t('history.empty')}</Text>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: StyleRules.ScreenPadding
  },
  emptyText: {
    color: Colors.Gray.Light,
    textAlign: 'center',
    fontSize: StyleRules.FontSize.Large
  }
});

export default connect(selector)(History);
