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
  recipes: [
    {
      "key": "0",
      "recipeName": "Gruel",
      "imageURL": 'https://upload.wikimedia.org/wikipedia/commons/b/be/Rice_gruel.jpg',
      "link": null,
      "timeInMinutes": 10,
      "servings": 100,
      "ingredients": [
        {
          "_id": "5c993a98cc6012780fdd67fa",
          "ingredName": "mush",
          "amount": 12,
          "units": "lbs",
          "adjective": "cold",
          "notes": null
        },
        {
          "_id": "5c993a98cc6012780fdd67f9",
          "ingredName": "salt",
          "amount": null,
          "units": null,
          "adjective": null,
          "notes": null
        },
      ],
    }
  ],
};

const reducer = (state = initialState, action) => {
  var newRecipes = []
  var i = 0;
  switch (action.type) {

    case 'ADD_RECIPE':
      for (i = 0; i < state.recipes.length; i++) {
        newRecipes.push(state.recipes[i])
      }
      const nextIdx = state.counter + 1
      newRecipes.push({ key: String(nextIdx), recipeName: action.recipeName, imageURL: action.imageURL, timeInMinutes: action.timeInMinutes, servings: action.servings })
      return {
        counter: nextIdx,
        recipes: newRecipes
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
        recipes: newRecipes
      };

    case 'CLEAR_RECIPES':
      return {
        counter: 0,
        recipes: []
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
