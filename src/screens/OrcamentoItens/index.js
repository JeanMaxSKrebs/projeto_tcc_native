import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { COLORS } from '../../assets/colors';
import ItemButton from '../../components/Itens/ItemButton';
import ItemModal from '../../components/Itens/modal';
// import ListaItensOrcamentos from '../../components/ItensOrcamentos/ListaItensOrcamentos';
import { Container, FlatList } from './styles';
import { ItensSaloesContext } from '../../context/ItensSaloesProvider';
import { ItensOrcamentosContext } from '../../context/ItensOrcamentosProvider';


const OrcamentoItens = ({ route, navigation }) => {
  const { itensSaloes, getItensSaloes, setItensSaloes } = useContext(ItensSaloesContext);
  const { itensOrcamentos, insertItemItensOrcamentos } = useContext(ItensOrcamentosContext);
  const acao = "adicionar"; // variável que muda o tipo do item (atualizar, adicionar, excluir(qualquer escrita))
  // console.log('itemteste')
  // console.log(route.params)

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [orcamento, setOrcamento] = useState(route.params.orcamento);

  const salao = route.params.salao;
  const idsNegados = route.params.itensSaloesId
  const voltar = () => {
    navigation.goBack();
  };

  useEffect(() => {
    // console.log('entrou OrcamnetoItens');
    // console.log(route.params);
    // console.log(route.params.salao);
    // console.log(route.params.orcamento);
    // console.log(itens);
    // console.log(itens);
    // console.log('idsNegados');
    // console.log(idsNegados);
    setItensSaloes(getItensSaloes(salao.id, idsNegados))
  }, [route.params]);

  const routeOrcamentoItens = (nextPage, novoOrcamento) => {
    // console.log("TESTE")
    // console.log(salao)
    // console.log(route)
    if (novoOrcamento) {
      navigation.dispatch(
        CommonActions.navigate({
          name: nextPage,
          params: { orcamento: novoOrcamento, salao: salao },
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.navigate({
          name: nextPage,
          params: { orcamento: orcamento, salao: salao },
        }),
      );
    }
  }


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
    // console.log(orcamento);
    switch (newItem.situacao) {
      case 'atualizar':
        // console.log('newItem123');
        if (updateItemItensSaloes(newItem)) {
          setItensSaloes(getItensSaloes(salao.id))
          routeOrcamentoItens('OrcamentoItens');
        }
        fecharModal();

        break;
      case 'adicionar':
        const novoOrcamento = await insertItemItensOrcamentos(newItem, orcamento);
        setOrcamento(novoOrcamento);
        routeOrcamentoItens('Orcamento', novoOrcamento);

        fecharModal();

        break;
      case 'excluir':

        fecharModal();

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
    // console.log('item789');
    // console.log(item);
    // console.log('item.uid:', item.uid);
    const shouldInvertDirection = item.id % 2 === 1;
    // console.log(shouldInvertDirection)
    return (
      <ItemButton isItensSaloes item={item} icone={acao} onPress={() => abrirModal(item)} direita={shouldInvertDirection} />
    );
  };

  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <View>
        <Texto tamanho={30} cor={COLORS.secundary} texto={'Itens / Utensílios'}></Texto>
        {/* <ScrollView style={{ height: 400, margin: 10 }}> */}
        <Container>
          {/* Renderize os itens aqui */}
          {/* {console.log('itens screen')}
          {console.log(itens)} */}
          <FlatList
            data={itensSaloes}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          {renderModal()}

        </Container>
        {/* <ListaItensOrcamentos></ListaItensOrcamentos> */}
        {/* </ScrollView> */}
      </View>
    </SafeAreaView >
  );
};



export default OrcamentoItens;


