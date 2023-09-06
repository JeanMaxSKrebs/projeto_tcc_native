import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, Image, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback
} from 'react-native';
import { COLORS } from '../../assets/colors';
import Texto from '../../components/Texto';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const ItemModal = ({ item, isModalVisible, onPress, acao }) => {
  // console.log('item1')
  // console.log(item)
  // console.log('isModalVisible1')
  // console.log(isModalVisible)
  // console.log('onPress')
  // console.log(onPress)
  // console.log('acao')
  // console.log(acao)
  // const [quantidade, setQuantidade] = useState(item.quantidadeMaxima);
  const [quantidade, setQuantidade] = useState();
  const [quantidadeMaxima, setQuantidadeMaxima] = useState(item.quantidadeMaxima);

  const [nome, setNome] = useState(item.itens.nome);
  const [descricao, setDescricao] = useState(item.itens.descricao);
  const [imagem, setImagem] = useState(item.itens.imagem);

  const [novoNome, setNovoNome] = useState(item.novoNome);
  const [novaDescricao, setNovaDescricao] = useState(item.novaDescricao);
  const [novaImagem, setNovaImagem] = useState(item.novaImagem);

  const [newItem, setNewItem] = useState(item);
  const quantidadeValues = Array.from({ length: item.quantidadeMaxima }, (_, index) => (index + 1).toString());

  const [selectedValue, setSelectedValue] = useState('option1');


  useEffect(() => {
  }, []);

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
    >
      <View onPress={() => onPress('fechar')} style={styles.background}>
        <TouchableWithoutFeedback >
          {acao === "atualizar" ? (
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
                value={quantidade}
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

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => onPress(newItem)}>
                  <Texto tamanho={0} texto={<Icon name="create" color={COLORS.black} size={35} />} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonExcluir} onPress={() => onPress('excluir')}>
                  <Texto tamanho={0} texto={<Icon name="close" color={COLORS.black} size={35} />} />
                </TouchableOpacity>
              </View>
            </View>
          ) : acao === "adicionar" ? (
            <View style={styles.content}>
              <TouchableOpacity style={styles.buttonClose} onPress={() => onPress('fechar')}>
                <Text>X</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.TextInput}
                placeholder={novoNome == null ? nome : novoNome}
                onChangeText={(text) => {
                  novoNome == null
                    ? (setNome(text), setNewItem({ ...newItem, novoNome: text, situacao: 'atualizar' }))
                    : (setNovoNome(text), setNewItem({ ...newItem, novoNome: text, situacao: 'atualizar' }))
                }}
                editable={false}
              />
              <TextInput
                style={styles.TextInput}
                placeholder={novaDescricao == null ? descricao : novaDescricao}
                onChangeText={(text) => {
                  novaDescricao == null
                    ? (setDescricao(text), setNewItem({ ...newItem, novaDescricao: text, situacao: 'atualizar' }))
                    : (setNovaDescricao(text), setNewItem({ ...newItem, novaDescricao: text, situacao: 'atualizar' }))
                }}
                editable={false}
              />
              <TextInput
                style={styles.TextInput}
                placeholder={`Quantidade Máxima: ${quantidadeMaxima}`}
                value={quantidade}
                onChangeText={(text) => {
                  if (text > quantidadeMaxima) {
                    setQuantidade(quantidadeMaxima);
                  } else {
                    setQuantidade(text)
                  }
                  setNewItem({ ...newItem, quantidade: text, situacao: 'atualizar' });
                }}
                keyboardType="numeric"
              />
              <Picker style={{width: 100, height: 50}}
                selectedValue={quantidade}
                onValueChange={(item, index) => {
                  setQuantidade(item);
                }}
              >
                {quantidadeValues.map((value) => (
                  <Picker.Item key={value} label={value} value={value} />
                ))}
              </Picker>
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
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => onPress(newItem)}>
                  <Texto tamanho={0} texto={<Icon name="add" color={COLORS.black} size={35} />}></Texto>
                </TouchableOpacity>
              </View>
            </View>
          ) : acao === "excluir" ? (
            <TouchableOpacity style={styles.buttonExcluir} onPress={() => onPress('excluir')}>
              <Texto tamanho={0} texto={<Icon name="close" color={COLORS.red} size={35} />}></Texto>
            </TouchableOpacity>
          ) : null
          }

        </TouchableWithoutFeedback >
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
