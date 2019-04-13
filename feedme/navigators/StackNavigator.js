import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen'
import RecipeSelectionScreen from '../screens/RecipeSelectionScreen'

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  RecipeSelectionScreen: {
    screen: RecipeSelectionScreen
  },

})