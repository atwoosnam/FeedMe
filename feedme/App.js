import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import TabNavigator from './navigators/TabNavigator';

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
      "imageURL": 'https://upload.wikimedia.org/wikipedia/commons/b/be/Rice_gruel.jpg'
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
      newRecipes.push({ key: String(nextIdx), recipeName: action.recipeName, imageURL: action.imageURL })
      return {
        counter: nextIdx,
        recipes: newRecipes
      };

    case 'REMOVE_LAST_RECIPE':
      for (i = 0; i < state.recipes.length - 1; i++) {
        newRecipes.push(state.recipes[i])
      }
      return {
        counter: state.counter,
        recipes: newRecipes
      };

    case 'REMOVE_FIRST_RECIPE':
      for (i = 1; i < state.recipes.length; i++) {
        newRecipes.push(state.recipes[i])
      }
      return {
        counter: state.counter,
        recipes: newRecipes
      };

    case 'REMOVE_RECIPE':
      for (i = 0; i < state.recipes.length; i++) {
        if (state.recipes[i].key !== action.key) {
          newRecipes.push(state.recipes[i])
        }
      }
      return {
        counter: state.counter,
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
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
