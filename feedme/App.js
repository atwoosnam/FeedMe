import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import PlaygroundScreen from './components/PlaygroundScreen';
import RecipeListScreen from './components/RecipeListScreen';
import ShoppingListScreen from './components/ShoppingListScreen';

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
  recipes: ["Gruel"],
};

const reducer = (state = initialState, action) => {
  var newRecipes = []
  var i=0;
  switch (action.type) {
    case 'INCREASE_COUNTER':
      return { 
        counter: state.counter + 1,
        recipes: state.recipes
      };

    case 'DECREASE_COUNTER':
      return { 
        counter: state.counter - 1,
        recipes: state.recipes
      };
    
    case 'ADD_RECIPE':
      for (i=0; i<state.recipes.length; i++) {
        newRecipes.push(state.recipes[i])
      }
      newRecipes.push(action.recipeName)
      return { 
        counter: state.counter,
        recipes: newRecipes
      };

    case 'REMOVE_LAST_RECIPE':
      for (i=0; i<state.recipes.length-1; i++) {
        newRecipes.push(state.recipes[i])
      }
      return { 
        counter: state.counter,
        recipes: newRecipes
      };
    
    case 'REMOVE_FIRST_RECIPE':
      for (i=1; i<state.recipes.length; i++) {
        newRecipes.push(state.recipes[i])
      }
      return { 
        counter: state.counter,
        recipes: newRecipes
      };

    case 'REMOVE_RECIPE':
      for (i=0; i<state.recipes.length; i++) {
        if (state.recipes[i].recipeName !== action.recipeName){
          newRecipes.push(state.recipes[i])
        }
      }
      return { 
        counter: state.counter,
        recipes: newRecipes
      };
    
    default:
      return state
  }
};

const store = createStore(reducer);

const TabNavigator = createBottomTabNavigator({
  Recipes: RecipeListScreen,
  'Shopping List': ShoppingListScreen,
  ':)': PlaygroundScreen,
});

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
