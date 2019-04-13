import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen'
import RecipeSelectionScreen from '../screens/RecipeSelectionScreen'
import RecipeDetailScreen from '../screens/RecipeDetailScreen'

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  RecipeSelectionScreen: {
    screen: RecipeSelectionScreen
  },
  RecipeDetailScreen: RecipeDetailScreen

})