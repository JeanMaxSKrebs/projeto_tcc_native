import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';
import MeuButton from '../MeuButton';
import DeleteButton from '../DeleteButton';
import AtualizarDados from '../../screens/AtualizarDados';

const ItemModal = ({ item, isModalVisible, onPress }) => {
  // console.log('item1')
  // console.log(item)
  // console.log('isModalVisible1')
  // console.log(isModalVisible)
  console.log('onPress')
  console.log(onPress)
  const [nome, setNome] = useState(item.nome);
  const [descricao, setDescricao] = useState(item.descricao);
  const [quantidadeMaxima, setQuantidadeMaxima] = useState(item.quantidadeMaxima.toString());
  const [imagem, setImagem] = useState(item.imagem);

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.background}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.buttonRed} onPress={onPress}>
            <Text>X</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.TextInput}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Descricão"
            value={descricao}
            onChangeText={setDescricao}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Quantidade Máxima"
            value={quantidadeMaxima}
            onChangeText={setQuantidadeMaxima}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button}
            onPress={async () => { onPress('atualizar') }}>
            <Text>Atualizar Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRed} onPress={async () => { onPress('excluir') }}>
            <Text>Excluir Item</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal >
  );
};

export default ItemModal;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    width: '80%',
    height: '60%',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    color: COLORS.secundary,
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 2,
    paddingBottom: 1,
    marginBottom: 10
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonRed: {
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  }

})
