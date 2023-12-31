import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView
} from 'react-native';
import { ToastAndroid } from 'react-native';
import { COLORS } from '../../assets/colors';
import Texto from '../../components/Texto';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import ModalExclusao from './modalExclusao'
import styled from 'styled-components/native';
import ImagePicker from '../../components/Camera/ImagePicker';

export const TextPlaceholder = styled.Text`
  text-align: left;
  font-size: 16px;
  margin-bottom: 2px;
  color: ${COLORS.secundary};
`;

export const TextInput = styled.TextInput`
  color: ${COLORS.secundary};
  width: 70%;
  height: 50px;
  border-width: 1px;
  border-radius: 15px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

export const ViewInput = styled.SafeAreaView`
  color: black;
  font-size: 30px;
  align-items: center; 
  width: 100%;
  /* background-color: red; */
`;

const ItemModal = ({ item, isModalVisible, onPress, acao, isItensSaloes, salao }) => {
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
  const [quantidadeAntiga, setQuantidadeAntiga] = useState(item.quantidade);
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
  const [valorUnitarioTemp, setValorUnitarioTemp] = useState(
    item.novoValorUnitario
      ? item.novoValorUnitario
      : item.valorUnitario
  );
  const [valorTotalItem, setValorTotalItem] = useState(item.valorTotalItem);

  const [newItem, setNewItem] = useState(item);
  const quantidadeMaximaValues = Array.from({ length: item.quantidadeMaxima + 1 }, (_, index) => (index).toString());
  const definicao = 1000
  const valoresDe0aDefinicao = Array.from({ length: definicao + 1 }, (_, index) => index.toString());

  const [isModalExclusaoVisible, setModalExclusaoVisible] = useState(false);
  const [tipoExclusao, setTipoExclusao] = useState(null);


  const [usarPicker, setUsarPicker] = useState(false);

  const [imagemTemp, setImagemTemp] = useState(novaImagem ? novaImagem : imagem);

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
      let newItemWithStatus = { ...newItem, status: 'inativo' };

      onPress({ ...newItemWithStatus, situacao: 'excluir', tipoExclusao: opcao });
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

  const handleImageSelected = (imageUri) => {
    console.log('imageUri');
    console.log(imageUri);
    setNovaImagem(imageUri);
    setNewItem({ ...newItem, novaImagem: imageUri, nomeSalao: salao.nome })
  };


  const toggleInputMethod = () => {
    setUsarPicker(!usarPicker);
  };

  const renderValorUnitario = () => {
    if (isItensSaloes) {
      return (<>
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          placeholder={`Valor Unitário: ${valorUnitarioTemp}`}
          value={novoValorUnitario ? novoValorUnitario.toString() : null}
          onChangeText={(text) => {
            setNovoValorUnitario(text)
            setNewItem({ ...newItem, novoValorUnitario: text })
          }}
        />
      </>)
    } else {
      return (<>
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          placeholder={`Valor Unitário: ${valorUnitarioTemp}`}
          value={novoValorUnitario ? novoValorUnitario.toString() : null}
          onChangeText={(text) => {
            setNovoValorUnitario(text)
            setNewItem({ ...newItem, novoValorUnitario: text })
          }}
        />
      </>)
    }
  }
  const renderQuantidade = () => {
    if (isItensSaloes) {
      return (<>
        {usarPicker ? (
          <Picker
            style={{ width: 120, height: 50 }}
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
        ) : (
          <TextInput
            style={styles.TextInput}
            placeholder={`Quantidade Máxima Antiga: ${quantidadeMaximaTemp.toString()}`}
            value={quantidadeMaxima.toString()}
            onChangeText={(text) => {
              if (text > definicao) {
                showToast(`Quantidade Máxima de Itens: ${definicao}`);
                setQuantidadeMaxima(quantidadeMaxima);
              } else {
                setQuantidadeMaxima(text);
              }
              setNewItem({ ...newItem, quantidadeMaxima: text });
            }}
            keyboardType="numeric"
          />
        )}
        <TouchableOpacity onPress={toggleInputMethod}>
          <View style={{
            flexDirection: 'row', alignItems: 'center',
            backgroundColor: `${COLORS.primaryShadow}`, padding: 10, borderRadius: 15,
          }}>
            <Texto cor={COLORS.secundary} texto={`Usar Modo ${usarPicker ? 'Texto' : 'Escolha'}`}></Texto>
          </View>
        </TouchableOpacity>
      </>
      )
    } else {
      return (<>
        {usarPicker ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 15 }}>{`Quantidade Máxima: ${quantidadeMaxima.toString()}`}</Text>
            <Picker
              style={{ width: 100, height: 50 }}
              selectedValue={quantidade}
              onValueChange={(item, index) => {
                setQuantidade(item);
                setNewItem({ ...newItem, quantidade: item });
              }}            >
              {quantidadeMaximaValues.map((value) => (
                <Picker.Item key={value} label={value} value={value} />
              ))}
            </Picker>
          </View>
        ) : (
          <TextInput
            style={styles.TextInput}
            placeholder={`Quantidade Máxima: ${quantidadeMaximaTemp.toString()}`}
            value={quantidade ? quantidade.toString() : null}
            onChangeText={(text) => {
              if (text > quantidadeMaxima) {
                showToast(`Quantidade Máxima de Itens: ${quantidadeMaxima}`);
                setQuantidade(0);
              } else {
                setQuantidade(text);
              }
              setNewItem({ ...newItem, quantidade: text });
            }}
            keyboardType="numeric"
          />
        )}
        <TouchableOpacity onPress={toggleInputMethod}>
          <View style={{
            flexDirection: 'row', alignItems: 'center',
            backgroundColor: `${COLORS.gray}`, padding: 5, borderRadius: 15, borderColor: 'black', borderWidth: 2
          }}>
            <Texto cor={COLORS.secundary} texto={`Usar Modo ${usarPicker ? 'Texto' : 'Escolha'}`}></Texto>
          </View>
        </TouchableOpacity>
      </>
      )
    }
  };
  const renderPlaceholder = (value) => {
    if (value !== '') {
      return <TextPlaceholder>{value}</TextPlaceholder>;
    }
    return null;
  };
  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
    >
      <ScrollView>
        <View onPress={() => onPress('fechar')} style={styles.background}>
          <TouchableWithoutFeedback>
            {acao === "atualizar" ? (
              <View style={styles.content}>
                <TouchableOpacity style={styles.buttonClose} onPress={() => onPress('fechar')}>
                  <Text>X</Text>
                </TouchableOpacity>
                <>
                  <>
                    <View style={{ width: '90%' }} >
                      {renderPlaceholder(novoNome ? 'Nome' : '')}
                    </View>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Nome"
                      value={novoNome === null ? nome : novoNome}
                      onChangeText={(text) => {
                        console.log('nome');
                        console.log(nome);
                        console.log('novoNome');
                        console.log(novoNome);
                        setNovoNome(text)
                        setNewItem({ ...newItem, novoNome: text })
                      }}
                    />
                  </>
                  <>
                    <View style={{ width: '90%' }} >
                      {renderPlaceholder(novaDescricao ? 'Descrição' : '')}
                    </View>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Descricão"
                      value={novaDescricao === null ? descricao : novaDescricao}
                      onChangeText={(text) => {
                        setNovaDescricao(text)
                        setNewItem({ ...newItem, novaDescricao: text })
                      }}
                    />
                  </>
                  <>
                    <View style={{ width: '90%' }} >
                      {renderPlaceholder(novoValorUnitario ? 'Valor Unitário' : '')}
                    </View>
                    {renderValorUnitario()}
                  </>
                  <>
                    <View style={{ width: '90%' }} >
                      {renderPlaceholder(quantidadeMaxima ? 'Quantidade Máxima' : '')}
                    </View>
                    {renderQuantidade()}
                  </>
                </>
                {console.log('novaImagem')}
                {console.log(novaImagem)}
                <View style={{ marginTop: 10, alignItems: 'center' }}>

                  <View style={{ width: '80%' }} >
                    {renderPlaceholder(novaImagem
                      ? 'Imagem Cadastrada'
                      : 'Sem Imagem Cadastrada')}
                    <View style={{ alignItems: 'center' }}>
                      <Image
                        style={{
                          width: 100, height: 100,
                          borderWidth: 1, borderColor: 'black', borderRadius: 15
                        }}
                        source={{ uri: imagemTemp }}
                      />
                    </View>
                  </View>
                  <ImagePicker onPress={handleImageSelected} modal />
                </View>

                {isModalExclusaoVisible ? renderModalExclusao() : null}

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.button} onPress={() => {
                    let newItemWithQuantidade = newItem;
                    if (!quantidade) {
                      newItemWithQuantidade = { ...newItem, quantidade: quantidadeMaxima };
                    }

                    const newItemWithSituacao = { ...newItemWithQuantidade, situacao: 'atualizar', valorAntigo: valorUnitarioTemp, quantidadeAntiga: quantidadeAntiga };
                    // console.log('newItemWithSituacao');
                    // console.log(newItemWithSituacao);
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
                  <>
                    <View style={{ width: '65%' }} >
                      {renderPlaceholder(nome || novoNome ? 'Nomes' : '')}
                    </View>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Nome"
                      value={novoNome === null ? nome : novoNome}
                      onChangeText={(text) => {
                        setNovoNome(text)
                        setNewItem({ ...newItem, novoNome: text })
                      }}
                    />
                  </>
                  <>
                    <TouchableOpacity>
                      <Text>Descricão</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Descricão"
                      value={novaDescricao === null ? descricao : novaDescricao}
                      onChangeText={(text) => {
                        setNovaDescricao(text)
                        setNewItem({ ...newItem, novaDescricao: text })
                      }}
                    />
                  </>
                  <>
                    <TouchableOpacity>
                      <Text>Valor Unitário</Text>
                    </TouchableOpacity>
                    {renderValorUnitario()}
                  </>
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
                    const newItemWithSituacao = { ...newItemWithQuantidade, situacao: 'adicionar', valorAntigo: valorUnitarioTemp, quantidadeAntiga: quantidadeAntiga };
                    // console.log('123123');
                    // console.log(newItemWithSituacao);
                    setNewItem(newItemWithSituacao);
                    onPress(newItemWithSituacao);
                  }}>
                    <Texto tamanho={0} texto={<Icon name="add" color={COLORS.black} size={35} />}></Texto>
                  </TouchableOpacity>
                </View>
              </View>
              ) : acao === "excluir" ? (
                <TouchableOpacity style={styles.button} onPress={() => {
                  const newItemWithSituacao = { ...newItem, situacao: 'excluir' };
                  setNewItem(newItemWithSituacao);
                  onPress(newItemWithSituacao);
                }}>
                  <Texto tamanho={0} texto={<Icon name="close" color={COLORS.red} size={35} />}></Texto>
                </TouchableOpacity>
              ) : null
            }

          </TouchableWithoutFeedback >
        </View >
      </ScrollView>
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
  },
  imagem: {
    width: 100,
    height: 100,
  }

})
