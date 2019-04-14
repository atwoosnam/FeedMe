import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import RecipeSelectionList from '../components/RecipeSelectionList'

export default class RecipeSelectionScreen extends Component {
  static navigationOptions = {
    title: 'Select A Recipe!'
  }
  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.body}>
          <RecipeSelectionList />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'linen'
  },
  body: {
    flex: 1,
  }
})