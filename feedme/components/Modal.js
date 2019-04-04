import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert } from 'react-native';
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
          <View>
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{ fontSize: 32, margin: 20, alignSelf: 'flex-end' }}>✖︎</Text>
              </TouchableOpacity>
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
