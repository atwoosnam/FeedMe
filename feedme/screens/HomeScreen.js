import Swipeout from 'react-native-swipeout';
import { SafeAreaView } from 'react-navigation'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import Modal from '../components/Modal'
import RecipeList from '../components/RecipeList';
import RecipeListItem from '../components/RecipeListItem';
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    var screenBody;
    if (this.props.recipes.length == 0) screenBody =
      <View style={{ alignContent: "center", justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>No Recipes Selected!</Text>
      </View>
    else screenBody = <FlatList
      data={this.props.recipes}
      renderItem={({ item, index, nav }) => {
        return (
          <RecipeListItem
            item={item}
            index={index}
            nav={this.props.navigation}
            itemPressAction={() => {
              console.log("I'm a recipe list item: ", item.recipeName)
            }}
          />
        );
      }}
      keyExtractor={item => item.key}
    />

    return (
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.headerContainer}>

          {/* <Modal style={styles.addButton} openButtonText="ADD" /> */}

          <Button title="Clear"
            style={styles.headerButton}
            onPress={() => {
              this.props.clearRecipes()
              this.props.state = { empty: true }
            }}
          />

          <Button title="Add"
            onPress={() => this.props.navigation.navigate('RecipeSelectionScreen')}
          />

          {/* 
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.clearButton}
            onPress={() => {
              this.props.clearRecipes()
              this.props.state = { empty: true }
            }}>
            <Text>CLEAR</Text>
          </TouchableOpacity> */}

        </View>
        <View style={styles.bodyContainer}>
          {screenBody}
        </View>
      </SafeAreaView>
    )
  }
}



function mapStateToProps(state) {
  return {
    counter: state.counter,
    recipes: state.recipes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearRecipes: () => dispatch({ type: 'CLEAR_RECIPES' }),
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(navContainer)
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerButton: {
    padding: 20
  },
  bodyContainer: {
    flex: 11,
    justifyContent: "center"
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center"
  },
  item: {
    padding: 10,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    borderBottomWidth: 1
  },
  addButton: {
    padding: 10,
    margin: 20,
    alignItems: 'center',
    backgroundColor: '#00cc66',
    borderRadius: 20
  },
  clearButton: {
    padding: 10,
    margin: 20,
    alignItems: 'center',
    backgroundColor: '#99ddff',
    borderRadius: 20
  },
});