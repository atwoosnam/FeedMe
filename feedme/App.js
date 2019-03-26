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
  TouchableOpacity,
} from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
} from 'react-navigation';


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
    // <Text style={styles.flatListItem}>{
    //   String(this.props.item.ingredients[0].amount) + ' '
    //   + String(this.props.item.ingredients[0].units) + ' '
    //   + String(this.props.item.ingredients[0].ingredName)
    // }</Text>
    return (
      <Swipeout {...swipeSettings}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View
            style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'column', height: 40 }}
              >
              <Text>{this.props.item.ingredName}</Text>
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
        var ingredientList = [];
        for (var i = 0; i < data.length; i++) {
          var ingreds = data[i].ingredients;
          for (var j = 0; j < ingreds.length; j++) {
            var ingredient = ingreds[j]
            ingredientList.push(ingredient);
          }
        }
        this.setState({
          ingredients: ingredientList,
        });
      });
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={{ borderColor: 'transparent', borderBottomWidth: 100 }}>
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
      <Swipeout {...swipeSettings}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View
            style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
            <Image
              source={{ uri: this.props.item.imageURL }}
              style={{ width: 100, height: 100, margin: 5 }}
            />
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'column', height: 100 }}
              onPress={() => {
                console.log(this.props.item.recipeName);
                console.log(this.props);
                this.props.nav.navigate('ShoppingList');
              }}>
              <Text style={styles.flatListItem}>
                {this.props.item.recipeName}
              </Text>
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
      <View style={{ borderColor: 'transparent', borderBottomWidth: 100 }}>
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
  flatListItem: {
    color: 'black',
    fontFamily: 'Academy Engraved LET',
    padding: 10,
    fontSize: 16,
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
});
