import Swipeout from 'react-native-swipeout';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

class ShoppingListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
    };
  }

  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {},
      onOpen: (secId, rowId, direction) => {},
      right: [
        {
          onPress: () => {},
          text: 'Delete',
          type: 'delete',
        },
      ],
      rowId: this.props.index,
      sectionId: 1,
    };

    return (
      <Swipeout {...swipeSettings}>
        <View style={styles.shoppingListItem}>
          <View
            style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'column',
                height: 40,
                justifyContent: 'center',
              }}>
              <Text>{this.props.item.description}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swipeout>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increaseCounter: () => dispatch({ type: 'INCREASE_COUNTER' }),
    decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingListItem);

const styles = StyleSheet.create({
  shoppingListItem: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    paddingLeft: 26,
    borderBottomColor: '#ABB2B9',
    borderBottomWidth: 1,
    borderBottomStartRadius: 10
  },
});