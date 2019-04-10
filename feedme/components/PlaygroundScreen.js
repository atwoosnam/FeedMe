import Swipeout from 'react-native-swipeout';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import Modal from './Modal'

class PlaygroundScreen extends Component {

  render() {
    var screenBody;
    if (this.props.recipes.length == 0) screenBody =
      <View style={{ alignContent: "center", justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>No Recipes Selected!</Text>
      </View>
    else screenBody = <FlatList
      data={this.props.recipes}
      renderItem={({ item }) => (
        <Text style={styles.item}>{item.key}</Text>
      )}
    />;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.buttonRow}>
          <Modal style={styles.addButton} openButtonText="ADD" />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.clearButton}
            onPress={() => {
              this.props.clearRecipes()
              this.props.state = { empty: true }
            }}>
            <Text>CLEAR</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.listContainer}>
          {screenBody}
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaygroundScreen)

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    // borderColor: 'red',
    // borderWidth: 3,
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
    // borderColor: 'yellow',
    // borderWidth: 3,
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