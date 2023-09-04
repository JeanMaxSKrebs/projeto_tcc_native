import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { COLORS } from '../../assets/colors';
import ItemButton from '../../components/Itens/ItemButton';
import ItemModal from '../../components/Itens/modal';
import ListaItensOrcamentos from '../../components/ItensOrcamentos/ListaItensOrcamentos';
import { Container, FlatList } from './styles';
import { SalaoContext } from '../../context/SalaoProvider';


const OrcamentoItens = ({ route }) => {
  const { itensSaloes, getItensData } = useContext(SalaoContext);

  console.log('itemteste')
  console.log(route.params)

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const item = route.params.item;
  const salao = route.params.salao;
  const orcamento = route.params.orcamento;

  useEffect(() => {
    console.log('entrou Orcamento');
    // console.log(route.params);
    // console.log(route.params.salao);
    // console.log(route.params.orcamento);
    // console.log(itens);
    // console.log(itens);
    getItensData(salao.id)
  }, []);

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
        {/* <ListaItensOrcamentos></ListaItensOrcamentos> */}
        {/* </ScrollView> */}
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: COLORS.secundary,
    width: '100%',
    height: 100,
    marginBottom: 5,
    alignItems: 'center',
  },
  image: {
    // borderWidth: 2,
    // borderRadius: 15,
    // borderColor: COLORS.secundary,
    width: '25%',
    aspectRatio: 1,
    marginRight: 5,
  },
  descricao: {
    width: '50%',
    justifyContent: 'center'
  },
  quantidade: {
    width: '25%',
  },
  buttonPlus: {
    backgroundColor: COLORS.black,
    borderRadius: 15,
    width: '60%',
    aspectRatio: 1,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  areaButton: {
    // backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default OrcamentoItens;


