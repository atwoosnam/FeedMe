import Swipeout from 'react-native-swipeout';
import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

class ShoppingListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
    };
  }

  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {},
      onOpen: (secId, rowId, direction) => {},
      right: [
        {
          onPress: () => {},
          text: 'Delete',
          type: 'delete',
        },
      ],
      rowId: this.props.index,
      sectionId: 1,
    };

    return (
      <Swipeout {...swipeSettings}>
        <View style={styles.shoppingListItem}>
          <View
            style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'column',
                height: 40,
                justifyContent: 'center',
              }}>
              <Text>{this.props.item.description}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swipeout>
    );
  }
}

class ShoppingListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: null,
    };
  }

  componentDidMount() {
    fetch('http://3.91.232.241:3000/recipes')
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
          var description = '• ';
          if (ingredient.amount != null)
            description += String(ingredient.amount) + ' ';
          if (ingredient.units != null) description += ingredient.units + ' ';
          if (ingredient.adjective != null)
            description += ingredient.adjective + ' ';
          description += ingredient.ingredName;
          if (ingredient.notes != null) description += ' ' + ingredient.notes;

          newStateList.push({ description: description });
        }

        this.setState({
          ingredients: newStateList,
        });
      });
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={{ borderColor: 'transparent', borderBottomWidth: 95 }}>
        <View style={styles.headerSection}>
          <Text style={styles.headerText}>Shopping List</Text>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
        <FlatList
          data={this.state.ingredients}
          keyExtractor={this._keyExtractor}
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
)(ShoppingListScreen);

const styles = StyleSheet.create({
  headerSection: {
    borderColor: 'transparent',
    borderTopWidth: 36,
    borderBottomWidth: 16,
    borderLeftWidth: 16,
    borderRightWidth: 16,
  },

  headerText: {
    fontSize: 32,
    fontFamily: 'AmericanTypewriter',
  },

  shoppingListItem: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    paddingLeft: 26,
    borderBottomColor: '#ABB2B9',
    borderBottomWidth: 1,
  },
});
