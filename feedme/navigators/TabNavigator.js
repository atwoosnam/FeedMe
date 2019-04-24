import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import StackNavigator from './StackNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator({
    HomeScreen: {
        screen: StackNavigator,
        navigationOptions: {
            title: "Recipes",
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="rice" size={26} style="outline" color="dimgrey" />
            )
        }
    },
    
    ShoppingListScreen: {
        screen: ShoppingListScreen,
        navigationOptions: {
            tabBarLabel: "Shopping List",
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="cart-outline" size={26} color="dimgrey" />
            )
        }
    }
});

export default createStackNavigator({ Tabs }, { headerMode: "none" });