import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';


class RecipeDetailScreen extends Component {
  static navigationOptions = {
    title: "Recipe Detail"
  }

  render() {
    const { recipeName, imageURL } = this.props.navigation.state.params.item

    return (
      <ScrollView style={{ backgroundColor: 'linen' }}>
        <ImageBackground style={{ height: 120 }} source={{ uri: imageURL }}>
          <View style={styles.floatingContainer}>
            <View style={styles.floatingContainerCanvas}>
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.titleText}>
                {recipeName}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView >

    )
  }
}


function mapStateToProps(state) {
  return {
    counter: state.counter,
    recipes: state.recipes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // clearRecipes: () => dispatch({ type: 'CLEAR_RECIPES' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailScreen)


const styles = StyleSheet.create({
  floatingContainer: {
    height: 100,
    top: 80,
    borderColor: 'transparent',
    marginHorizontal: '20%'
  },
  floatingContainerCanvas: {
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    padding: 25,
    textAlign: "center",
    fontSize: 24,
    fontFamily: 'AmericanTypewriter'
  }
})