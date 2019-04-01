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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_COUNTER':
      return { counter: state.counter + 1 };
    case 'DECREASE_COUNTER':
      return { counter: state.counter - 1 };
  }
  return state;
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
