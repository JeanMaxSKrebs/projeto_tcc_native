import React, { useState } from 'react';
import {
  View, Text, Modal, Image, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback
} from 'react-native';
import { COLORS } from '../../assets/colors';
import Texto from '../../components/Texto';
import Icon from 'react-native-vector-icons/Ionicons';

const ItemModal = ({ item, isModalVisible, onPress, acao }) => {
  // console.log('item1')
  // console.log(item)
  // console.log('isModalVisible1')
  // console.log(isModalVisible)
  // console.log('onPress')
  // console.log(onPress)
  // console.log('acao')
  // console.log(acao)
  const [nome, setNome] = useState(item.nome);
  const [descricao, setDescricao] = useState(item.descricao);
  const [quantidadeMaxima, setQuantidadeMaxima] = useState(item.quantidadeMaxima.toString());
  const [imagem, setImagem] = useState(item.imagem);
  const [novoNome, setNovoNome] = useState(item.novoNome);
  const [novaDescricao, setNovaDescricao] = useState(item.novaDescricao);
  const [novaImagem, setNovaImagem] = useState(item.novaImagem);
  const [newItem, setNewItem] = useState(item);

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={() => onPress('fechar')}>
        <View style={styles.background}>
          <View style={styles.content}>
            <TouchableOpacity style={styles.buttonClose} onPress={() => onPress('fechar')}>
              <Text>X</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.TextInput}
              placeholder="Nome"
              value={novoNome == null ? nome : novoNome}
              onChangeText={(text) => {
                novoNome == null
                  ? (setNome(text), setNewItem({ ...newItem, novoNome: text, situacao: 'atualizar' }))
                  : (setNovoNome(text), setNewItem({ ...newItem, novoNome: text, situacao: 'atualizar' }))
              }}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Descricão"
              value={novaDescricao == null ? descricao : novaDescricao}
              onChangeText={(text) => {
                novaDescricao == null
                  ? (setDescricao(text), setNewItem({ ...newItem, novaDescricao: text, situacao: 'atualizar' }))
                  : (setNovaDescricao(text), setNewItem({ ...newItem, novaDescricao: text, situacao: 'atualizar' }))
              }}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Quantidade Máxima"
              value={quantidadeMaxima}
              onChangeText={(text) => {
                setQuantidadeMaxima(text);
                setNewItem({ ...newItem, quantidadeMaxima: text, situacao: 'atualizar' });
              }}
              keyboardType="numeric"
            />
            <View>
              {/* <TouchableOpacity onPress={pickImage}> */}
              <Text>Selecionar Imagem</Text>
              {/* </TouchableOpacity> */}
              {novaImagem ? (
                <Image source={{ uri: novaImagem }} style={styles.imagem} />
              ) : (
                imagem && <Image source={{ uri: imagem }} style={styles.imagem} />
              )}
            </View>
            {acao === "atualizar" ? (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => onPress(newItem)}>
                  <Texto tamanho={0} texto={<Icon name="create" color={COLORS.black} size={35} />} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonExcluir} onPress={() => onPress('excluir')}>
                  <Texto tamanho={0} texto={<Icon name="close" color={COLORS.black} size={35} />} />
                </TouchableOpacity>
              </View>
            ) : acao === "adicionar" ? (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => onPress(newItem)}>
                  <Texto tamanho={0} texto={<Icon name="add" color={COLORS.primary} size={35} />}></Texto>
                </TouchableOpacity>
              </View>
            ) : acao === "excluir" ? (
              <TouchableOpacity style={styles.buttonExcluir} onPress={() => onPress('excluir')}>
                <Texto tamanho={0} texto={<Icon name="close" color={COLORS.red} size={35} />}></Texto>
              </TouchableOpacity>
            ) : null
            }

          </View >
        </View >
      </TouchableWithoutFeedback>
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
    // height: '60%',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    color: COLORS.secundary,
    width: '100%',
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
    marginTop: 10,
    marginRight: 15,
    marginBottom: 10,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonExcluir: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonClose: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: COLORS.red,
    padding: 10,
    alignSelf: 'flex-end',
    borderRadius: 5,
  }

})
