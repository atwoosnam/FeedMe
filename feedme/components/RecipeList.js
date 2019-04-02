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


export default class RecipeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch('http://3.91.232.241:3000/recipes')
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
            />
          );
        }}
        keyExtractor={item => item._id}
      />
    )
  }
}