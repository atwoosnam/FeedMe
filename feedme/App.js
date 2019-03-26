import Swipeout from 'react-native-swipeout';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  SectionList,
  Text,
  View,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Card, ListItem, Icon } from 'react-native-elements';

class RecipeListItem extends Component {
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
      <Swipeout
        {...swipeSettings}
        style={{ marginBottom: 4, backgroundColor: 'white' }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'column', height: 100 }}
              activeOpacity={0.7}
              onPress={() => {
                console.log(this.props.item.recipeName);
                console.log(this.props);
                this.props.nav.navigate('ShoppingList');
              }}>
              <ImageBackground
                source={{ uri: this.props.item.imageURL }}
                style={styles.imageBG}>
                <View style={styles.overlay}>
                  <Text style={styles.flatListText}>
                    {this.props.item.recipeName}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </Swipeout>
    );
  }
}

class RecipeList extends Component {
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
      <View style={{ borderColor: 'transparent' }}>
        <View style={styles.headerSection}>
          <Text style={styles.headerText}>Recipes</Text>
        </View>
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

class ShoppingList extends Component {
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

const TabNavigator = createBottomTabNavigator({
  Recipes: RecipeList,
  'Shopping List': ShoppingList,
});

const AppContainer = createAppContainer(TabNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  imageBG: {
    flex: 1,
  },

  flatListText: {
    fontFamily: 'Academy Engraved LET',
    padding: 10,
    fontSize: 26,
    color: '#fff',
  },
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
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shoppingListItem: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    paddingLeft: 26,
  },
});
