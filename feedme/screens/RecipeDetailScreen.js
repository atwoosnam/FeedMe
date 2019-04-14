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
    return (
      <ScrollView style={{ backgroundColor: 'linen' }}>
        <ImageBackground style={{ height: 120 }} source={{ uri: this.props.recipes[0].imageURL }}>
          <View style={{ marginTop: '20%', marginLeft: '20%', marginRight: '20%' }}>
            <View style={{ backgroundColor: 'white', borderRadius: 5, shadowColor: 'black', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 5 }, alignItems: "center", justifyContent: "center" }}>
              <Text adjustsFontSizeToFit numberOfLines={2} style={{ padding: 25, textAlign: "center", fontSize: 24, fontFamily: 'AmericanTypewriter' }}>{this.props.recipes[0].recipeName}</Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>

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
    clearRecipes: () => dispatch({ type: 'CLEAR_RECIPES' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailScreen)


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  header: {
    flex: 1,
    backgroundColor: "blue"
  },
  body: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center"
  },

  container: {
    flex: 1,
    backgroundColor: "white"
  },
  headerImage: {
    height: 150,

  },
  subHeaderImage: {
    height: 110,
    width: 110,
    marginTop: 35,
    marginLeft: 25,
    borderColor: "white",
    borderWidth: 2,
    zIndex: 5
  },
})