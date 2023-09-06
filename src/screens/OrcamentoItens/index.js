import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { COLORS } from '../../assets/colors';
import ItemButton from '../../components/Itens/ItemButton';
import ItemModal from '../../components/Itens/modal';
// import ListaItensOrcamentos from '../../components/ItensOrcamentos/ListaItensOrcamentos';
import { Container, FlatList } from './styles';
import { ItensSaloesContext } from '../../context/ItensSaloesProvider';


const OrcamentoItens = ({ route, navigation }) => {
  const { itensSaloes, getItensSaloes, updateItemItensSaloes} = useContext(ItensSaloesContext);
  const acao = "adicionar"; // variável que muda o tipo do item (atualizar, adicionar, excluir(qualquer escrita))
  // console.log('itemteste')
  // console.log(route.params)

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const salao = route.params.salao;
  const orcamento = route.params.orcamento;

  const voltar = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log('');
    // console.log(route.params);
    // console.log(route.params.salao);
    // console.log(route.params.orcamento);
    // console.log(itens);
    // console.log(itens);
    getItensSaloes(salao.id)
  }, []);

  const abrirModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const opcao = (newItem) => {
    console.log('newItem.situacao');
    console.log(newItem.situacao);
    switch (newItem.situacao) {
      case 'atualizar':
        // console.log('newItem123');
        // console.log(newItem);
        if(updateItemItensSaloes(newItem)) {
          getItensSaloes(salao.id)
          fecharModal();
        }
        break;
      case 'adicionar':
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
    console.log('newItem')
    console.log(newItem)

    opcao(newItem);
  };

  const renderModal = () => {
    if (!selectedItem) {
      return null;
    }
    return (
      <ItemModal item={selectedItem} salao={salao} isModalVisible acao={acao} onPress={(item) => handlePress(item)}
      />
    );
  };

  const renderItem = ({ item }) => {
    // console.log('item');
    // console.log(item);
    // console.log('item.uid:', item.uid);
    const shouldInvertDirection = item.id % 2 === 1;
    // console.log(shouldInvertDirection)
    return (
      <ItemButton item={item} icone={acao} onPress={() => abrirModal(item)} direita={shouldInvertDirection} />
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


