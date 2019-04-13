import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/HomeScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';

const Tabs = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            title: "Home",
            // tabBarIcon: ({ tintColor }) => (
            //     <Icon
            //         name="microchip"
            //         size={17}
            //         color={tintColor} />
            // )
        }
    },
    RecipeListScreen: {
        screen: ShoppingListScreen,
        navigationOptions: {
            tabBarLabel: "Shopping List",
            // tabBarIcon: ({ tintColor }) => (
            //     <Icon
            //         name="memory"
            //         size={17}
            //         color={tintColor} />
            // )
        }
    }
});

//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default createStackNavigator({ Tabs }, { headerMode: "none" });