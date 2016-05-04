import React, {
  ListView,
  StyleSheet,
  PropTypes
} from 'react-native';
import {connect} from 'react-redux';
import selector from '../selectors/history';
import HistoryRow from '../components/history/row';
import Screen from '../components/screen';

class History extends React.Component {
  constructor (props) {
    var dataSource;
    super(props);

    dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    console.log('PROPS', props)
    this.state ={
      dataSource: dataSource.cloneWithRows(this.props.history)
    };
  }

  render () {
    return (
      <Screen>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={action => <HistoryRow task={action} />}
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

export default connect(selector)(History);
