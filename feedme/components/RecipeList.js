import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Button,
} from 'react-native';
import RecipeListItem from './RecipeListItem'
import { connect } from 'react-redux';


class RecipeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch('http://3.91.232.241:3000/recipes.json')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={({ item, index, nav }) => {
          return (
            <RecipeListItem
              item={item}
              index={index}
              nav={this.props.navigation}
              itemPressAction = {() => {
                this.props.addRecipe(item._id, item.recipeName, item.imageURL)
              } }
            />
          );
        }}
        keyExtractor={item => item._id}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
    recipes: state.recipes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addRecipe: (key, recipeName, imageURL) => dispatch({ type: 'ADD_RECIPE', key: key, recipeName: recipeName, imageURL: imageURL }),
    increaseCounter: () => dispatch({ type: 'INCREASE_COUNTER' }),
    decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList);