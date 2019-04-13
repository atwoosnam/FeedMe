import { SafeAreaView } from 'react-navigation'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import RecipeListItem from '../components/RecipeListItem';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    var screenBody;
    if (this.props.recipes.length == 0) screenBody =
      <View style={{ alignContent: "center", justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>No Recipes Selected!</Text>
      </View>
    else screenBody = <FlatList
      data={this.props.recipes}
      renderItem={({ item, index, nav }) => {
        return (
          <RecipeListItem
            item={item}
            index={index}
            nav={this.props.navigation}
            itemPressAction={() => {
              console.log("I'm a recipe list item: ", item.recipeName)
            }}
          />
        );
      }}
      keyExtractor={item => item.key}
    />

    return (
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.headerContainer}>

          <Button title="Clear"
            style={styles.headerButton}
            onPress={() => {
              this.props.clearRecipes()
              this.props.state = { empty: true }
            }}
          />

          <Text style={styles.headerText}>Upcoming Recipes</Text>

          <Button title="Add"
            onPress={() => this.props.navigation.navigate('RecipeSelectionScreen')}
          />

        </View>
        <View style={styles.bodyContainer}>
          {screenBody}
        </View>
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  headerButton: {

  },
  bodyContainer: {
    flex: 11,
    justifyContent: "center"
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: 'AmericanTypewriter',
  },
});