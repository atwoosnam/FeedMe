import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'

class RecipeDetailScreen extends Component {
  static navigationOptions = {
    title: "Recipe Detail"
  }

  render() {

    var { recipeName, imageURL, servings, timeInMinutes } = this.props.navigation.state.params.item
    timeInMinutes = String(timeInMinutes) + " min"

    return (
      <View style={styles.rootContainer}>
        <ImageBackground style={styles.imageBG} source={{ uri: imageURL }}>
          <View style={styles.floatingContainer}>
            <View style={styles.floatingContainerCanvas}>
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.titleText}>
                {recipeName}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.bodyContainer}>
          <View style={styles.bodyHeader}>
            <View style={styles.timeContainer}>
              <View style={{ justifyContent: "center" }}>
                <Icon name='timer' color='dimgrey' size={36} />
              </View>
              <View style={{ marginLeft: 5, justifyContent: "center" }}>
                <Text style={{ fontSize: 20, color: 'dimgrey' }}>{timeInMinutes}</Text>
              </View>
            </View>
            <View style={styles.servingsContainer}>
              <Text style={{ fontSize: 20, color: 'dimgrey', fontWeight: '600' }}>Serves: </Text>
              <Text style={{ fontSize: 20, color: 'dimgrey' }}>{servings}</Text>
            </View>
          </View>
        </View>
      </View >
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
    // clearRecipes: () => dispatch({ type: 'CLEAR_RECIPES' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailScreen)


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  imageBG: {
    height: 110
  },
  floatingContainer: {
    height: 100,
    top: 70,
    borderColor: 'transparent',
    marginHorizontal: '20%'
  },
  floatingContainerCanvas: {
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    padding: 25,
    textAlign: "center",
    fontSize: 24,
    fontFamily: 'AmericanTypewriter'
  },
  bodyContainer: {
    top: 60,
    flex: 2
  },
  bodyHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  timeContainer: {
    width: 130,
    height: 50,
    justifyContent: "center",
    flexDirection: "row"
  },
  servingsContainer: {
    width: 160,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
})