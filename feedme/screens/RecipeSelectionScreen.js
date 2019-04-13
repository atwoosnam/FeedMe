import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import RecipeList from '../components/RecipeList'

export default class RecipeSelectionScreen extends Component {
  static navigationOptions = {
    title: 'Select A Recipe!'
  }
  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.body}>
          <RecipeList />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    padding: 15,
    marginTop: 15
  },
  topRight: {
    flex: 1
  },
  topLeft: {
    flex: 4,
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  headerText: {
    fontSize: 22,
    // adjustsFontSizeToFit: true,
    fontWeight: "600",
    fontFamily: 'AmericanTypewriter',
    margin: 10
  },
  body: {
    flex: 1,
  }
})