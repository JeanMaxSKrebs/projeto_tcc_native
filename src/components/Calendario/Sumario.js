import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../assets/colors';
import MeuButton from '../MeuButton';

const Sumario = ({ sumario, onPress, tamanho }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const width = tamanho / 2 || '25';

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderModal = (item) => {
    console.log('item');
    console.log(item);
    return (
      <Modal transparent={true} >
        <TouchableOpacity onPress={toggleModal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            {sumario.map((item, index) => (
              <View key={index} style={[styles.colorBox, { backgroundColor: item.color }]}>
                <Text style={styles.colorText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </Modal >
    )
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Icon size={width} name="help-circle-outline"></Icon>
      </TouchableOpacity>
      {isModalVisible && renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  colorBox: {
    margin: 1,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  colorText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Sumario;
