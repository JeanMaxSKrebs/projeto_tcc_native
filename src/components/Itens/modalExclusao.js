import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const ModalExclusao = ({ isModalExclusaoVisible, onConfirm }) => {
  // console.log("TESTE");
  // console.log(isModalExclusaoVisible);
  // console.log('onConfirm');
  // console.log(onConfirm);
  const [choice, setChoice] = useState(null);

  const handleConfirm = (option) => {
    setChoice(option);
    onConfirm(option); // Chama a função onConfirm com a opção escolhida
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalExclusaoVisible}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text>Tem certeza?</Text>
          <TouchableOpacity onPress={() => handleConfirm('softDelete')}>
            <Text>Soft Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleConfirm('hardDelete')}>
            <Text>Hard Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleConfirm('cancelar')}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalExclusao;
