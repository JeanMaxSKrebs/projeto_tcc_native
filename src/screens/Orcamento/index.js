import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import AlterarOrcamentoButton from '../../components/Orcamento/AlterarOrcamentoButton';
import AdicionarItemButton from '../../components/Orcamento/AdicionarItemButton';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { Container, FlatList, Content, TextInput, View } from './styles';
import { CommonActions } from '@react-navigation/native';
import { ItensOrcamentosContext } from '../../context/ItensOrcamentosProvider.js';
import ItemButton from '../../components/Itens/ItemButton';
import ItemButtonCliente from '../../components/Itens/ItemButtonCliente';
import ListaItensOrcamentos from '../../components/ItensOrcamentos/ListaItensOrcamentos';
import ItemModal from '../../components/Itens/modal';
import { OrcamentosContext } from '../../context/OrcamentosProvider';
import AlterarOrcamento from '../../components/Orcamento/AlterarOrcamento';
import MeuButton from '../../components/MeuButton';

const Orcamento = ({ route, navigation }) => {
  const { setOrcamento, getOrcamentoById, updateOrcamento } = useContext(OrcamentosContext);
  const { itensOrcamento, getItensOrcamentoById, setItensOrcamento,
    itensOrcamentos, getItensOrcamentos, setItensOrcamentos,
    updateItemItensOrcamentos,
    hardDeleteItemOrcamento, softDeleteItemOrcamento } = useContext(ItensOrcamentosContext);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorBase, setValorBase] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const acao = "atualizar"; // variável que muda o tipo do item (atualizar, adicionar, excluir(qualquer escrita))
  let contador = 0;
  const [observacoes, setObservacoes] = useState('');


  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalClienteVisible, setModalClienteVisible] = useState(false);

  const user = route.params.user;
  const orcamento = route.params.orcamento;
  const salao = route.params.salao;
  const cliente = route.params.cliente;
  const dataReserva = route.params.dataReserva;
  const horarioReserva = route.params.horarioReserva;

  let imprimirContent = false;

  { cliente ? tamanhoContainer = '95%' : imprimirContent = true }

  useEffect(() => {
    console.log('entrou ItensOrcamentos');
    // console.log(route.params);
    // console.log(route.params.orcamento);
    console.log(orcamento.id);
    // console.log(route.params.salao);
    // console.log('orcamento.id');
    // console.log(route.params.orcamento);
    // console.log('itensOrcamentos');
    // console.log(itensOrcamentos);
    // orcamento = getOrcamentoById(orcamento.id);

    setOrcamento(getOrcamentoById(orcamento.id))
    setItensOrcamentos(getItensOrcamentos(orcamento.id))
    setItensOrcamento(getItensOrcamentoById(orcamento.id))
    // console.log('teste');

  }, [route.params.orcamento]);

  const voltar = () => {
    navigation.goBack();
  };

  function pegarIds(itensOrcamentos) {
    const ids = [];

    itensOrcamentos.forEach((item) => {
      if (item.hasOwnProperty("id")) {
        ids.push(item.itensSaloesId);
      }
    });

    const idsFormatados = `(${ids.join(',')})`;

    // console.log(idsFormatados);
    return idsFormatados;
  }

  const routeOrcamento = (orcamento, nextView) => {
    console.log("TESTE")
    console.log(orcamento)
    // console.log(cliente)
    // console.log(salao)
    // console.log(route)
    // console.log('itensOrcamentos');
    // console.log(itensOrcamento);
    console.log('observacoes');
    console.log(observacoes);
    {
      observacoes && (
        orcamento.observacoes = observacoes
      )
    }
    console.log(orcamento)


    let itensSaloesId = pegarIds(itensOrcamento)

    navigation.dispatch(
      CommonActions.navigate({
        name: nextView,
        params: {
          orcamento: orcamento, itensSaloesId: itensSaloesId,
          salao: salao, cliente: cliente,
          dataReserva: dataReserva, horarioReserva: horarioReserva,
          user: user
        },
      }),
    );
  }

  const abrirModalCliente = (item) => {
    setSelectedItem(item);
    setModalClienteVisible(true);
  };

  const fecharModalCliente = () => {
    setSelectedItem(null);
    setModalClienteVisible(false);
  };

  const abrirModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const opcao = async (newItem) => {
    // console.log('newItem.situacao');
    // console.log(newItem.situacao);
    // console.log(newItem);
    switch (newItem.situacao) {
      case 'atualizar':
        // console.log('newItem123');
        // console.log(newItem);
        let novoOrcamento = await updateItemItensOrcamentos(newItem, orcamento);

        if (novoOrcamento) {
          // await setOrcamento(getOrcamentoById(orcamento.id))
          // console.log('orcamentoNOVO');
          // console.log(novoOrcamento);
          routeOrcamento(novoOrcamento, 'Orcamento');
          fecharModal();
        }
        break;
      case 'adicionar':
        // const novoOrcamento = await insertItemItensOrcamentos(newItem, orcamento);
        // setOrcamento(novoOrcamento);
        // routeOrcamento(novoOrcamento, 'Orcamento');
        fecharModal();

        break;
      case 'excluir':
        try {
          // console.log('entrei');
          // console.log(newItem);
          let novoValorItens = orcamento.valorItens - newItem.valorTotal
          let novoValorTotal = orcamento.valorTotal - newItem.valorTotal
          let novoOrcamento = { ...orcamento, valorItens: novoValorItens, valorTotal: novoValorTotal }
          updateOrcamento(orcamento.id, novoOrcamento);
          {
            newItem.tipoExclusao === 'hardDelete'
              ? hardDeleteItemOrcamento(newItem.id)
              : softDeleteItemOrcamento(newItem.id)
          }
          console.log('Operações de atualização e exclusão concluídas com sucesso.');

          fecharModal();
          routeOrcamento(novoOrcamento, 'Orcamento');
        } catch (error) {
          // Se ocorrer um erro em qualquer uma das operações, trate o erro aqui
          console.error('Ocorreu um erro ao atualizar/excluir:', error);
        }

        break;

      default:

        fecharModal();
        break;
    }

  };

  const handlePress = (newItem) => {
    // console.log('newItem')
    // console.log(newItem)

    opcao(newItem);
  };


  const renderModal = () => {
    if (!selectedItem) {
      return null;
    }
    // console.log('selectedItem');
    // console.log(selectedItem);
    return (
      <ItemModal item={selectedItem} salao={salao} isModalVisible acao={acao} onPress={(item) => handlePress(item)}
      />
    );
  };
  const renderItem = ({ item }) => {
    // console.log('item123');
    // console.log(item);

    contador++;
    const shouldInvertDirection = contador % 2 === 1;
    // console.log(shouldInvertDirection)
    return (
      <ItemButton item={item} onPress={() => abrirModal(item)} isModalVisible icone={acao} direita={shouldInvertDirection} />
      // <ListaItensOrcamentos itemOrcamento={item} onPress={() => abrirModal(item)} isModalVisible icone={acao} direita={shouldInvertDirection} />
    );
  };

  const renderItemCliente = ({ item }) => {
    // console.log('item123');
    // console.log(item);

    contador++;
    const shouldInvertDirection = contador % 2 === 1;
    // console.log(shouldInvertDirection)
    return (
      <ItemButtonCliente item={item} onPress={() => abrirModalCliente(item)} isModalVisible icone={acao} direita={shouldInvertDirection} />
      // <ListaItensOrcamentos itemOrcamento={item} onPress={() => abrirModal(item)} isModalVisible icone={acao} direita={shouldInvertDirection} />
    );
  };


  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      {cliente
        ? (<View>
          <AlterarOrcamento
            item={orcamento}
          />
          <View>
            <View>
              <Texto tamanho={25} texto={'Observações'}></Texto>
              <TextInput
                value={observacoes}
                onChangeText={text => setObservacoes(text)}
              />
            </View>
            <Content style={{ height: 300 }}>
              <Texto tamanho={25} texto={'Itens Disponibilizados'}></Texto>
              <FlatList
                data={itensOrcamento}
                renderItem={renderItemCliente}
                keyExtractor={(item) => item.id}
              />
            </Content>

          </View>

          <View>
            <MeuButton texto={dataReserva || horarioReserva ? 'Selecionar' : 'Reservar'}
              onClick={() => routeOrcamento(orcamento, 'Reservar')}
            />
          </View>
        </View>
        ) : (
          <View>
            {/* {console.log('orcamento teste')}
        {console.log(orcamento)} */}
            <AlterarOrcamentoButton
              item={orcamento}
              onClick={() => routeOrcamento(orcamento, 'AlterarOrcamento')}
            />
            <View>
              <View>
                <AdicionarItemButton
                  item={orcamento}
                  onClick={() => routeOrcamento(orcamento, 'OrcamentoItens')}
                />

                <Content style={{ height: 250 }}>
                  <Texto tamanho={25} texto={'Itens Disponibilizados'}></Texto>
                  <FlatList
                    data={itensOrcamento}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                  />
                </Content>
                {renderModal()}

              </View>
            </View>
          </View>
        )
      }
    </SafeAreaView >
  );
};

export default Orcamento;
