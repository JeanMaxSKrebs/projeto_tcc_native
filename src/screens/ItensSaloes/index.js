import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, Modal, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
// import { SalaoContext } from '../../context/SalaoProvider';
import { ItensSaloesContext } from '../../context/ItensSaloesProvider';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { COLORS } from '../../assets/colors';
import ItemButton from '../../components/Itens/ItemButton';
import ItemModal from '../../components/Itens/modal';
import { Container, FlatList } from './styles';
import MeuButton from '../../components/MeuButton'

const ItensSaloes = ({ route, navigation }) => {
  const { itensSaloes, setItensSaloes, getItensSaloes,
    updateItemItensSaloes, softDeleteItemSalao, hardDeleteItemSalao } = useContext(ItensSaloesContext);
  const [itensSaloesTemp, setItensSaloesTemp] = useState([]);
  const acao = "atualizar"; // variável que muda o tipo do item (atualizar, adicionar, excluir(qualquer escrita))
  // const [itens, setItens] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // console.log(route);

  const salao = route.params.salao;


  const voltar = () => {
    navigation.goBack();
  };

  
  const routeItem = item => {
    // console.log('calica');
    // console.log(item);

    switch (item) {
      case 'AdicionarItem':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'AdicionarItemSalao',
            params: { salao: salao },
          }),
        );
        break;
      default:
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Orcamento',
            params: { orcamento: item, salao: salao },
          }),
        );
        break;
    }
  };

  // console.log('Gerenciar itens')
  // console.log(route.params);
  // console.log(route.params.salao);

  useEffect(() => {
    // console.log('entrou itensSaloes');
    // console.log(route.params);
    // console.log(route.params.salao);
    // console.log(route.params.orcamento);
    // console.log(itens);
    // console.log(itens);
    setItensSaloes(getItensSaloes(salao.id))
  }, [route.params]);

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
        console.log('newItem1234');
        console.log(newItem);
        if (updateItemItensSaloes(newItem)) {
          // console.log("atualizar");
          setItensSaloes(getItensSaloes(salao.id))
          // console.log(getItensSaloes(salao.id))
          // setItensSaloesTemp(getItensSaloes(salao.id))

          fecharModal();
        }
        break;
      case 'adicionar':
        fecharModal();

        break;
      case 'excluir':
        {
          newItem.tipoExclusao === 'hardDelete'
          ? hardDeleteItemSalao(newItem.id)
          : softDeleteItemSalao(newItem.id)
        }

        setItensSaloes(getItensSaloes(salao.id))
        fecharModal();

        break;

      default:

        fecharModal();
        break;
    }

  };

  const handlePress = (newItem) => {
    // console.log('newItem2')
    // console.log(newItem)

    opcao(newItem);
  };

  const renderModal = () => {
    if (!selectedItem) {
      return null;
    }
    // console.log('selectedItem itenssaloes');
    // console.log(selectedItem);
    return (
      <ItemModal item={selectedItem} salao={salao} isItensSaloes isModalVisible acao={acao} onPress={(item) => handlePress(item)}
      />
    );
  };

  const renderItem = ({ item }) => {
    // console.log('item234');
    // console.log(item);
    // console.log('item.uid:', item.uid);
    const shouldInvertDirection = item.id % 2 === 1;
    // console.log(shouldInvertDirection)
    return (
      <ItemButton isItensSaloes item={item} icone={acao} onPress={() => abrirModal(item)} direita={shouldInvertDirection} />
      // <ItemButton item={item} tabela={'ItensSaloes'} icone={acao} onPress={() => abrirModal(item)} direita={shouldInvertDirection} />
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
          {/* {console.log('itensSaloes')}
          {console.log(itensSaloes)} */}
          {/* {console.log('itensSaloesTemp')}
          {console.log(itensSaloesTemp[0])} */}
          <FlatList
            data={itensSaloes}
            // data={itensSaloesTemp.length > 0  ? itensSaloesTemp : itensSaloes}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          {renderModal()}

          <MeuButton
              texto="Adicionar Item"
              cor={COLORS.primary}
              onClick={() => routeItem('AdicionarItem')}
            />
        </Container>
        {/* </ScrollView> */}
      </View>
    </SafeAreaView >
  );
};

export default ItensSaloes;
