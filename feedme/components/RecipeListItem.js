import Swipeout from 'react-native-swipeout';
import React, { Component } from 'react';
import {
  StyleSheet,
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
      onClose: (secId, rowId, direction) => { },
      onOpen: (secId, rowId, direction) => { },
      right: [
        {
          onPress: () => {
            this.props.removeRecipe(this.props.index)
          },
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
              onPress={this.props.itemPressAction}
            >
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

function mapStateToProps(state) {
  return {
    counter: state.counter,
    recipes: state.recipes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeRecipe: (idx) => dispatch({ type: 'REMOVE_RECIPE', index: idx }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeListItem);

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

  overlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});