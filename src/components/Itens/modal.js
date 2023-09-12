import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, Image, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback
} from 'react-native';
import { ToastAndroid } from 'react-native';
import { COLORS } from '../../assets/colors';
import Texto from '../../components/Texto';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import ModalExclusao from './modalExclusao'
const ItemModal = ({ item, isModalVisible, onPress, acao, isItensSaloes }) => {
  // console.log('item1')
  // console.log(item)
  // console.log('isModalVisible1')
  // console.log(isModalVisible)
  // console.log('isItensSaloes')
  // console.log(isItensSaloes)
  // console.log('onPress')
  // console.log(onPress)
  // console.log('acao')
  // console.log(acao)
  // const [quantidade, setQuantidade] = useState(item.quantidadeMaxima);
  const [quantidade, setQuantidade] = useState(item.quantidade);
  const [quantidadeMaxima, setQuantidadeMaxima] = useState(item.quantidadeMaxima);
  const [quantidadeMaximaTemp, setQuantidadeMaximaTemp] = useState(item.quantidadeMaxima);

  const [nome, setNome] = useState(item.itens.nome);
  const [descricao, setDescricao] = useState(item.itens.descricao);
  const [imagem, setImagem] = useState(item.itens.imagem);

  const [novoNome, setNovoNome] = useState(item.novoNome);
  const [novaDescricao, setNovaDescricao] = useState(item.novaDescricao);
  const [novaImagem, setNovaImagem] = useState(item.novaImagem);

  const [valorUnitario, setValorUnitario] = useState(item.valorUnitario);
  const [novoValorUnitario, setNovoValorUnitario] = useState(item.novoValorUnitario);
  const [valorUnitarioTemp, setValorUnitarioTemp] = useState(item.valorUnitario);

  const [newItem, setNewItem] = useState(item);
  const quantidadeMaximaValues = Array.from({ length: item.quantidadeMaxima + 1 }, (_, index) => (index).toString());
  const definicao = 1000
  const valoresDe0aDefinicao = Array.from({ length: definicao + 1 }, (_, index) => index.toString());

  const [isModalExclusaoVisible, setModalExclusaoVisible] = useState(false);
  const [tipoExclusao, setTipoExclusao] = useState(null);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
  }, []);

  const abrirModalExclusao = () => {
    setModalExclusaoVisible(true);
  };

  const fecharModalExclusao = () => {
    setModalExclusaoVisible(false);
  };

  const handleExclusao = (opcao) => {
    console.log(`Exclusão escolhida: ${opcao}`);

    if (opcao !== 'cancelar') {
      setTipoExclusao(opcao)
      onPress({ ...newItem, situacao: 'excluir', tipoExclusao: opcao });
    }
    fecharModalExclusao();
  };

  const renderModalExclusao = () => {
    // console.log(isModalExclusaoVisible);

    return (

      <ModalExclusao
        isModalExclusaoVisible
        onConfirm={handleExclusao} />
    );
  };

  const renderQuantidade = () => {
    if (isItensSaloes) {
      return (<>
        <TextInput
          style={styles.TextInput}
          placeholder={`Quantidade Antiga: ${quantidadeMaximaTemp}`}
          value={quantidadeMaxima.toString()}
          onChangeText={(text) => {
            if (text > definicao) {
              showToast(`Quantidade Máxima de Itens: ${definicao}`);
              setQuantidadeMaxima(quantidadeMaxima);
            } else {
              setQuantidadeMaxima(text)
            }
            setNewItem({ ...newItem, quantidadeMaxima: text });
          }}
          keyboardType="numeric"
        />
        <Picker style={{ width: 120, height: 50 }}
          selectedValue={quantidadeMaxima}
          onValueChange={(item, index) => {
            setQuantidadeMaxima(item);
            setNewItem({ ...newItem, quantidadeMaxima: item });
          }}
        >
          {valoresDe0aDefinicao.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
      </>
      )
    } else {
      return (<>
        <TextInput
          style={styles.TextInput}
          placeholder={`Quantidade Máxima: ${quantidadeMaximaTemp}`}
          value={quantidade !== null ? quantidade : quantidadeMaxima.toString()}
          onChangeText={(text) => {
            if (text > quantidadeMaxima) {
              showToast(`Quantidade Máxima desse Item: ${quantidadeMaxima}`);
              setQuantidade(quantidade);
            } else {
              setQuantidade(text)
            }
            setNewItem({ ...newItem, quantidade: text });
          }}
          keyboardType="numeric"
        />
        <Picker style={{ width: 100, height: 50 }}
          selectedValue={quantidade}
          onValueChange={(item, index) => {
            setQuantidade(item);
            setNewItem({ ...newItem, quantidade: item });
          }}
        >
          {quantidadeMaximaValues.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
      </>
      )
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
    >
      <View onPress={() => onPress('fechar')} style={styles.background}>
        <TouchableWithoutFeedback>
          {acao === "atualizar" ? (
            <View style={styles.content}>
              <TouchableOpacity style={styles.buttonClose} onPress={() => onPress('fechar')}>
                <Text>X</Text>
              </TouchableOpacity>
              <>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Nome"
                  value={novoNome == null ? nome : novoNome}
                  onChangeText={(text) => {
                    novoNome == null
                      ? (setNome(text), setNewItem({ ...newItem, novoNome: text }))
                      : (setNovoNome(text), setNewItem({ ...newItem, novoNome: text }))
                  }}
                />
                <TextInput
                  style={styles.TextInput}
                  placeholder="Descricão"
                  value={novaDescricao == null ? descricao : novaDescricao}
                  onChangeText={(text) => {
                    novaDescricao == null
                      ? (setDescricao(text), setNewItem({ ...newItem, novaDescricao: text }))
                      : (setNovaDescricao(text), setNewItem({ ...newItem, novaDescricao: text }))
                  }}
                />

                <TextInput
                  style={styles.TextInput}
                  placeholder={`Valor Unitário: ${valorUnitarioTemp}`}
                  value={valorUnitario.toString()}
                  onChangeText={(text) => {
                    valorUnitario === null
                      ? (setValorUnitario(text), setNewItem({ ...newItem, valorUnitario: text }))
                      : (setValorUnitario(text), setNewItem({ ...newItem, valorUnitario: text }))
                  }}
                />
              </>

              {renderQuantidade()}

              <View>
                {/* <TouchableOpacity onPress={pickImage}>
                <Text>Selecionar Imagem</Text>
                {/* </TouchableOpacity> */}
                {novaImagem ? (
                  <Image source={{ uri: novaImagem }} style={styles.imagem} />
                ) : (
                  imagem && <Image source={{ uri: imagem }} style={styles.imagem} />
                )}
              </View>
              {/* {console.log('isModalExclusaoVisible')}
              {console.log(isModalExclusaoVisible)} */}
              {isModalExclusaoVisible ? renderModalExclusao() : null}

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} onPress={() => {
                  let newItemWithQuantidade = newItem;
                  if (!quantidade) {
                    newItemWithQuantidade = { ...newItem, quantidade: quantidadeMaxima };
                  }

                  const newItemWithSituacao = { ...newItemWithQuantidade, situacao: 'atualizar' };
                  setNewItem(newItemWithSituacao);
                  onPress(newItemWithSituacao);
                }}>
                  <Texto tamanho={0} texto={<Icon name="create" color={COLORS.black} size={35} />} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonExcluir}
                  onPress={() => abrirModalExclusao()}
                >

                  <Texto tamanho={0} texto={<Icon name="close" color={COLORS.black} size={35} />}></Texto>
                </TouchableOpacity>
              </View>
            </View >
          ) : acao === "adicionar"
            ? (<View style={styles.content}>
              <TouchableOpacity style={styles.buttonClose} onPress={() => onPress('fechar')}>
                <Text>X</Text>
              </TouchableOpacity>
              <>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Nome"
                  value={novoNome == null ? nome : novoNome}
                  onChangeText={(text) => {
                    novoNome == null
                      ? (setNome(text), setNewItem({ ...newItem, novoNome: text }))
                      : (setNovoNome(text), setNewItem({ ...newItem, novoNome: text }))
                  }}
                />
                <TextInput
                  style={styles.TextInput}
                  placeholder="Descricão"
                  value={novaDescricao == null ? descricao : novaDescricao}
                  onChangeText={(text) => {
                    novaDescricao == null
                      ? (setDescricao(text), setNewItem({ ...newItem, novaDescricao: text }))
                      : (setNovaDescricao(text), setNewItem({ ...newItem, novaDescricao: text }))
                  }}
                />
                <TextInput
                  style={styles.TextInput}
                  placeholder={`Valor Unitário: ${valorUnitarioTemp}`}
                  value={valorUnitario.toString()}
                  onChangeText={(text) => {
                    valorUnitario === null
                      ? (setValorUnitario(text), setNewItem({ ...newItem, valorUnitario: text }))
                      : (setValorUnitario(text), setNewItem({ ...newItem, valorUnitario: text }))
                  }}
                />
              </>
              {renderQuantidade()}

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
                <TouchableOpacity style={styles.button} onPress={() => {
                  let newItemWithQuantidade = newItem;

                  if (!quantidade) {
                    newItemWithQuantidade = { ...newItem, quantidade: quantidadeMaxima };
                  }
                  const newItemWithSituacao = { ...newItemWithQuantidade, situacao: 'adicionar' };
                  setNewItem(newItemWithSituacao);
                  onPress(newItemWithSituacao);
                }}>
                  <Texto tamanho={0} texto={<Icon name="add" color={COLORS.black} size={35} />}></Texto>
                </TouchableOpacity>
              </View>
            </View>
            ) : acao === "excluir" ? (
              <TouchableOpacity style={styles.button} onPress={() => {
                const newItemWithSituacao = { ...newItem, situacao: 'adicionar' };
                setNewItem(newItemWithSituacao);
                onPress(newItemWithSituacao);
              }}>
                <Texto tamanho={0} texto={<Icon name="close" color={COLORS.red} size={35} />}></Texto>
              </TouchableOpacity>
            ) : null
          }

        </TouchableWithoutFeedback >
      </View >
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
