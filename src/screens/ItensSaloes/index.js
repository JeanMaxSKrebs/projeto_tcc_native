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

const Itens = ({ route, navigation }) => {
  const { itensSaloes, getItensSaloes } = useContext(ItensSaloesContext);
  const acao = "atualizar"; // variável que muda o tipo do item (atualizar, adicionar, excluir(qualquer escrita))
  // const [itens, setItens] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const voltar = () => {
    navigation.goBack();
  };

  console.log('Gerenciar itens')
  // console.log(route.params);
  // console.log(route.params.salao);

  let salao = route.params.salao;

  useEffect(() => {
    console.log('entrou itensSaloes');
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

  const opcao = (resultado) => {
    console.log('resultado');
    console.log(resultado);
    switch (resultado) {
      case 'atualizar':
        console.log("oi");
        fecharModal();
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

  const handlePress = (valor) => {
    console.log('valor')
    console.log(valor)
    opcao(valor);
  };

  const renderModal = () => {
    if (!selectedItem) {
      return null;
    }

    return (
      <ItemModal item={selectedItem} salao={salao} isModalVisible acao={acao} onPress={(valor) => handlePress(valor)}
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
        {/* </ScrollView> */}
      </View>
    </SafeAreaView >
  );
};

export default Itens;
