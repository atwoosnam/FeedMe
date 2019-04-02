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
import { connect } from 'react-redux';
import RecipeListItem from './RecipeListItem'

class RecipeListScreen extends Component {
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
      <View style={{ borderColor: 'transparent', borderBottomWidth: 95 }}>
        <View style={styles.headerSection}>
          <Text style={styles.headerText}>Recipes</Text>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
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
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increaseCounter: () => dispatch({ type: 'INCREASE_COUNTER' }),
    decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeListScreen);

const styles = StyleSheet.create({
  headerSection: {
    borderColor: 'transparent',
    borderTopWidth: 36,
    borderBottomWidth: 16,
    borderLeftWidth: 16,
    borderRightWidth: 16,
    flexDirection: 'row'
  },

  headerText: {
    fontSize: 32,
    fontFamily: 'AmericanTypewriter',
  },

});
