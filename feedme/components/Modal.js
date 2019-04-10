import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
import RecipeList from './RecipeList'

export default class ModalExample extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modalPopUpContainer}>
            <View style={styles.modalPopUpHeader}>
              <View style={styles.modalPopUpTopLeft}>
                <Text style={styles.headerText}> Select Some Recipes!</Text>
              </View>
              <View style={styles.modalPopUpTopRight}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  activeOpacity={0.7}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={{ fontSize: 32, margin: 5 }}>✖︎</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalPopUpBody}>
              <RecipeList />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          activeOpacity={0.7}
          style={this.props.style}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>{this.props.openButtonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalPopUpContainer: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 10
  },
  modalPopUpHeader: {
    // borderWidth: 5,
    // borderColor:
    //   'yellow',
    flexDirection: "row",
    padding: 15,
    marginTop: 15
  },
  modalPopUpTopRight: {
    // borderWidth: 5,
    // borderColor: "blue",
    flex: 1
  },
  modalPopUpTopLeft: {
    flex: 4,
    // borderWidth: 5,
    // borderColor: "cyan",
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  headerText: {
    fontSize: 22,
    // adjustsFontSizeToFit: true,
    fontWeight: "600",
    fontFamily: 'AmericanTypewriter',
    margin: 10
  },
  modalPopUpBody: {
    flex: 1,
    // borderColor: "orange",
    // borderWidth: 5,
  }
})