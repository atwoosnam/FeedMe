import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
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
  body: {
    flex: 1,
  }
})