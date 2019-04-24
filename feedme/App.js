import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import TabNavigator from './navigators/TabNavigator';
import { View, Text } from 'react-native'

import { AppLoading, Font } from 'expo';
import MaterialIcons from './node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';
import FontAwesome from './node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';

/**
 * === REDUX ===
 * Store - holds our state - THERE IS ONLY ONE STATE
 * Action - State can be modified using actions - SIMPLE OBJECTS
 * Dispatcher - Action needs to be sent by someone - known as dispatching an action
 * Reducer - receives the action and modifies the state to give us a new state
 *  - pure functions
 *  - only mandatory argument is the 'type'
 * Subscriber - listens for state change to update the ui
 */

const initialState = {
  counter: 0,
  recipes: [],
  ingredients: {},
};

const reducer = (state = initialState, action) => {
  var newRecipes = []
  var newIngredients = {}
  var i = 0;
  switch (action.type) {

    case 'ADD_RECIPE':
      for (i = 0; i < state.recipes.length; i++) {
        newRecipes.push(state.recipes[i])
      }
      const nextIdx = state.counter + 1
      newRecipes.push({
        key: String(nextIdx),
        recipeName: action.recipeObj.recipeName,
        imageURL: action.recipeObj.imageURL,
        timeInMinutes: action.recipeObj.timeInMinutes,
        servings: action.recipeObj.servings,
        ingredients: action.recipeObj.ingredients
      })

      newIngredients = state.ingredients
      for (i = 0; i < action.recipeObj.ingredients.length; i++) {
        ingredient = action.recipeObj.ingredients[i]
        if (!(ingredient.ingredName in state.ingredients)) {
          var description = '';
          if (ingredient.amount != null)
            description += String(ingredient.amount) + ' ';
          if (ingredient.units != null) description += ingredient.units + ' ';
          if (ingredient.adjective != null)
            description += ingredient.adjective + ' ';
          description += ingredient.ingredName;
          if (ingredient.notes != null) description += ' ' + ingredient.notes;

          newIngredients[ingredient.ingredName] = {
            description: description,
            repetitions: 1,
            key: ingredient._id
          }
        } else {
          newIngredients[ingredient.ingredName].repetitions += 1
        }
      }
      return {
        counter: nextIdx,
        recipes: newRecipes,
        ingredients: newIngredients
      };

    case 'REMOVE_RECIPE':
      for (i = 0; i < state.recipes.length; i++) {
        var thisRecipe = state.recipes[i]
        if (Number(thisRecipe.key) < Number(action.index)) {
          newRecipes.push(thisRecipe)
        } else if (Number(thisRecipe.key) > Number(action.index)) {
          var updatedRecipe = thisRecipe
          updatedRecipe.key = String(Number(thisRecipe.key) - 1)
          newRecipes.push(thisRecipe)
        }
      }

      return {
        counter: state.counter - 1,
        recipes: newRecipes,
        ingredients: state.ingredients
      };

    case 'CLEAR_RECIPES':
      return {
        counter: 0,
        recipes: [],
        ingredients: []
      }

    default:
      return state
  }
};

const store = createStore(reducer);

const AppContainer = createAppContainer(TabNavigator);

class App extends Component {
  state = {
    fontLoaded: false
  };

  async componentWillMount() {
    try {
      await Font.loadAsync({
        FontAwesome,
        'Material Icons': MaterialIcons
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
