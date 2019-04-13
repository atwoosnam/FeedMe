import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import StackNavigator from './StackNavigator';


const Tabs = createBottomTabNavigator({
    HomeScreen: {
        screen: StackNavigator,
        navigationOptions: {
            title: "Home",
        }
    },
    ShoppingListScreen: {
        screen: ShoppingListScreen,
        navigationOptions: {
            tabBarLabel: "Shopping List",
        }
    }
});

export default createStackNavigator({ Tabs }, { headerMode: "none" });