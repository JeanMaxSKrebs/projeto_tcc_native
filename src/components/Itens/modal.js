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


  const toggleInputMethod = () => {
    setUsarPicker(!usarPicker);
  };

  const renderValorUnitario = () => {
    if (isItensSaloes) {
      return (<>
        <TextInput
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
            placeholder={`Quantidade Antiga: ${quantidadeMaximaTemp.toString()}`}
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
            backgroundColor: `${COLORS.gray}`, padding: 5, borderRadius: 15, borderColor: 'black', borderWidth: 2
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
                setNewItem({ ...newItem, quantidade: item});
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
              setNewItem({ ...newItem, quantidade: text});
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
  //  ○  ✓

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
                <>
                  <TouchableOpacity>
                    <Text>Nome</Text>
                  </TouchableOpacity>
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
                <>
                  <TouchableOpacity>
                    <Text>Quantidade</Text>
                  </TouchableOpacity>
                  {renderQuantidade()}
                </>
              </>

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
                  <TouchableOpacity>
                    <Text>Nome</Text>
                  </TouchableOpacity>
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
