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
    return (
      <View style={styles.container}>
        {/* <View style={{ flexDirection: 'row', width:200, justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={() => this.props.increaseCounter()}>
                <Text style={{ fontSize: 20 }}>+</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }}>{this.props.counter}</Text>
            <TouchableOpacity onPress={() => this.props.decreaseCounter()}>
                <Text style={{ fontSize: 20 }}>-</Text>
            </TouchableOpacity>
        </View> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text>{this.props.recipes}</Text>
          {/* <FlatList
            data={this.props.recipes}
            renderItem={({ item }) => {
              console.log(this.props.recipes)
              return (
                <View>
                  <Text>•</Text>
                  <Text>{item.recipeName}</Text>
                </View>
              );
            }}
            keyExtractor={item => item._id}
          /> */}
        </View>
        <Modal></Modal>
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
    increaseCounter: () => dispatch({ type: 'INCREASE_COUNTER' }),
    decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaygroundScreen)

const styles = StyleSheet.create({
 container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
});