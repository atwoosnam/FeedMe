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

class RecipeSelectionListItem extends Component {
  render() {
    return (
      <View style={styles.itemCell}>
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeSelectionListItem);

const styles = StyleSheet.create({
  itemCell: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white'
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