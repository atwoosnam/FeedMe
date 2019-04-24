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
    var display = <ShoppingList />
    if (this.props.recipes.length == 0) {
      display = <View style={{ alignContent: "center", justifyContent: "center", flex: 1 }}>
        <Text style={{ textAlign: "center" }}>No Recipes Selected!</Text>
      </View>
    }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'beige' }}>
        <View style={styles.headerSection}>
          <Text adjustsFontSizeToFit style={styles.headerText}>Shopping List</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {display}
        </View>
      </SafeAreaView>

    );
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
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
