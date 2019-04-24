import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux';
import ShoppingList from '../components/ShoppingList'

class ShoppingListScreen extends Component {

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'beige' }}>
        <View style={styles.headerSection}>
          <Text adjustsFontSizeToFit style={styles.headerText}>Shopping List</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <ShoppingList />
        </View>
      </SafeAreaView>

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
    height: 70,
    backgroundColor: 'beige',
    justifyContent: "center",
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 30,
    paddingLeft: 15,
    fontFamily: 'AmericanTypewriter',
  },
});
