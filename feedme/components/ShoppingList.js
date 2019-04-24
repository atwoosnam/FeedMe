import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
import ShoppingListItem from './ShoppingListItem'

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: null,
    };
  }

  componentDidMount() {
    fetch('http://3.91.232.241:3000/recipes.json')
      .then(response => response.json())
      .then(data => {
        var ingredientHash = {};
        for (var i = 0; i < data.length; i++) {
          var ingreds = data[i].ingredients;
          for (var j = 0; j < ingreds.length; j++) {
            var ingredient = ingreds[j];

            if (!(ingredient.ingredName in ingredientHash)) {
              ingredientHash[ingredient.ingredName] = ingredient;
            } else {
              if (ingredient.amount != null) {
                ingredientHash[ingredient.ingredName].amount +=
                  ingredient.amount;
              }
            }
          }
        }

        var ingredientList = Object.values(ingredientHash);
        var newStateList = [];
        for (var idx = 0; idx < ingredientList.length; idx++) {
          ingredient = ingredientList[idx];
          var description = '';
          if (ingredient.amount != null)
            description += String(ingredient.amount) + ' ';
          if (ingredient.units != null) description += ingredient.units + ' ';
          if (ingredient.adjective != null)
            description += ingredient.adjective + ' ';
          description += ingredient.ingredName;
          if (ingredient.notes != null) description += ' ' + ingredient.notes;

          newStateList.push({ description: description, key: idx.toString() });
        }

        this.setState({
          ingredients: newStateList,
        });
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.ingredients}
          keyExtractor={item => item.key}
          renderItem={({ item, index, nav }) => {
            return (
              <ShoppingListItem
                item={item}
                index={index}
                nav={this.props.navigation}
              />
            );
          }}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});