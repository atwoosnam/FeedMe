import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import ShoppingListItem from './ShoppingListItem'
import { connect } from 'react-redux';

class ShoppingList extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={Object.values(this.props.ingredients)}
          keyExtractor={item => item.key}
          renderItem={({ item, index }) => {
            return (
              <ShoppingListItem
                item={item}
                index={index}
              />
            );
          }}
        />
      </View>
    )
  }
}


function mapStateToProps(state) {
  return {
    counter: state.counter,
    recipes: state.recipes,
    ingredients: state.ingredients
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
