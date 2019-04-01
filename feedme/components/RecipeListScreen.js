import Swipeout from 'react-native-swipeout';
import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

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
  },

  headerText: {
    fontSize: 32,
    fontFamily: 'AmericanTypewriter',
  },

  imageBG: {
    flex: 1,
  },

  flatListText: {
    fontFamily: 'Academy Engraved LET',
    padding: 10,
    fontSize: 26,
    color: '#fff',
  },

  overlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
