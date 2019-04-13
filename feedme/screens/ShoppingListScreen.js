import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import ShoppingList from '../components/ShoppingList'

class ShoppingListScreen extends Component {

  render() {
    return (
      <View style={{ borderColor: 'transparent', borderBottomWidth: 95 }}>
        <View style={styles.headerSection}>
          <Text style={styles.headerText}>Shopping List</Text>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
        <ShoppingList />
      </View>
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingListScreen);

const styles = StyleSheet.create({
  headerSection: {
    borderColor: 'transparent',
    borderTopWidth: 36,
    borderBottomWidth: 16,
    borderLeftWidth: 16,
    borderRightWidth: 16,
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'AmericanTypewriter',
  },
});
