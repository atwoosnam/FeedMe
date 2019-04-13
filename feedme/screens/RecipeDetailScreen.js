import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


export default class RecipeDetailScreen extends Component {
  static navigationOptions = {
    title: "Recipe Detail Screen"
  }
  render() {
    return (
      <View style={styles.rootContainer}>
        <Text>Hi</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})