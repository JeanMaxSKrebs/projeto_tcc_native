import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, Modal, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { SalaoContext } from '../../context/SalaoProvider';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { COLORS } from '../../assets/colors';
import ItemButton from '../../components/Itens/ItemButton';
import ItemModal from '../../components/Itens/modal';
import { Container, FlatList } from './styles';

const Itens = ({ route, navigation }) => {
  const { itensSaloes, getItensData } = useContext(SalaoContext);
  // const [itens, setItens] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const voltar = () => {
    navigation.goBack();
  };
  
  console.log('Gerenciar itens')
  console.log(route.params);
  console.log(route.params.salao);
  console.log(route.params.itensSaloes);

  let salao = route.params.salao;

  useEffect(() => {
    console.log('entrou itens');
    // console.log(route.params);
    // console.log(route.params.salao);
    // console.log(route.params.orcamento);
    // console.log(itens);
    // console.log(itens);
    getItensData(salao.id)
  }, []);

  //TODO
  const atualizar = () => {
    console.log('atualizar');
  };
  const excluir = () => {
    console.log('excluir');
  };

  const modificarItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderModal = () => {
    if (!selectedItem) {
      return null;
    }

    return (
      <ItemModal item={selectedItem} isModalVisible onPress={(retorno) => {
        setSelectedItem(null)
        setModalVisible(false)
        { retorno === 'atualizar' ? atualizar() : excluir() }
      }
      }
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
      <ItemButton item={item} onPress={() => modificarItem(item)} direita={shouldInvertDirection} />
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
            keyExtractor={item => item.uid}
          />
          {renderModal()}

        </Container>
        {/* </ScrollView> */}
      </View>
    </SafeAreaView >
  );
};

export default Itens;
