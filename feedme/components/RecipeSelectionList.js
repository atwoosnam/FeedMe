import React, { Component } from 'react';
import {
  FlatList,
} from 'react-native';
import RecipeSelectionListItem from './RecipeSelectionListItem'
import { connect } from 'react-redux';


class RecipeSelectionList extends Component {
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
            <RecipeSelectionListItem
              item={item}
              index={index}
              nav={this.props.navigation}
              itemPressAction = {() => {
                this.props.addRecipe(item.recipeName, item.imageURL)
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
    addRecipe: (recipeName, imageURL) => dispatch({ type: 'ADD_RECIPE', recipeName: recipeName, imageURL: imageURL }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeSelectionList);