import React, {
  PropTypes,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import {LETTERS} from '../constants/letters';
import {Actions as RouterActions} from 'react-native-router-flux';
import selector from '../selectors/contacts';
import * as ContactActions from '../actions/contacts';
import AlphabetListView from 'react-native-alphabetlistview';
import Colors from '../constants/colors';
import ContactRow from '../components/contactRow';
import Screen from '../components/screen';
import StyleRules from '../constants/styleRules';

class ContactSelector extends React.Component {
  static propTypes = {
    contacts: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor (props) {
    // the letter/section map for the alphabetical list view
    var letterMap = LETTERS.reduce((letters, letter) => ({
      ...letters,
      [letter]: []
    }), {});

    // shift '#' (matches for non letters) to the bottom of the list
    letterMap = {
      ...letterMap,
      '#': []
    };

    super(props);
    this.letterMapTemplate = letterMap;
    this.state = {letterMap};
  }

  componentDidMount () {
    this.props.dispatch(ContactActions.getContacts());
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.contacts !== nextProps.contacts) {
      // merge the contacts into the complete letter map template
      const letterMap = {
        ...this.letterMapTemplate,
        ...nextProps.contacts
      };
      this.setState({letterMap});
    }
  }

  selectContact (contact) {
    this.props.dispatch(ContactActions.selectContact(contact.id, contact.phoneNumber));
    RouterActions.pop();
  }

  render () {
    return (
      <Screen>
        <AlphabetListView
          data={this.state.letterMap}
          cell={Cell}
          cellHeight={50}
          onCellSelect={contact => this.selectContact(contact)}
          sectionListItem={PagerItem}
          sectionHeader={SectionHeader}
          sectionHeaderHeight={10}
        />
      </Screen>
    );
  }
}

/**
 * The section header component for each letter in the list view
 */
function SectionHeader ({title}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string
};

/**
 * The letter component for the side-pager
 */
function PagerItem ({title}) {
  return (
    <Text style={styles.sectionPagerText}>{title}</Text>
  );
}

PagerItem.propTypes = {
  title: PropTypes.string
};

/**
 * The cell wrapper for each row
 */
function Cell ({item, onSelect}) {
  return (
    <ContactRow
      onPress={() => onSelect(item)}
      contact={item}
    />
  );
}

Cell.propTypes = {
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: StyleRules.ScreenPadding / 2,
    backgroundColor: Colors.Gray.Light
  },
  sectionHeaderText: {
    color: Colors.White
  },
  sectionPagerText: {
    color: Colors.Blue.Light
  }
});

export default connect(selector)(ContactSelector);
