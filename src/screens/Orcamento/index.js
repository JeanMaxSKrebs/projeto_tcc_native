import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import AlterarOrcamentoButton from '../../components/Orcamento/AlterarOrcamentoButton';
import AdicionarItemButton from '../../components/Orcamento/AdicionarItemButton';
import OrcamentoItens from '../OrcamentoItens';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { Container, FlatList, Content, TextInput, View } from './styles';
import { CommonActions } from '@react-navigation/native';
import { SalaoContext } from '../../context/SalaoProvider';

const Orcamento = ({ route, navigation }) => {
  // console.log(route)
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorBase, setValorBase] = useState('');
  const [valorTotal, setValorTotal] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const salao = route.params.salao;
  const orcamento = route.params.orcamento;

  console.log('orcamento')
  console.log(route.params);
  const voltar = () => {
    navigation.goBack();
  };

  const routeOrcamento = (orcamento, nextView) => {
    console.log("TESTE")
    console.log(orcamento)
    console.log(salao)
    // console.log(route)
    navigation.dispatch(
      CommonActions.navigate({
        name: nextView,
        params: { item: orcamento, salao: salao },
      }),
    );
  }

  const modificarItem = (orcamento) => {
    setSelectedItem(orcamento);
    setModalVisible(true);
  };

  const renderItem = ({ orcamento }) => {
    // console.log('item123');
    // console.log(item);
    console.log('orcamento1');
    console.log(orcamento);
    // console.log('item.uid:', item.uid);
    const shouldInvertDirection = orcamento.id % 2 === 1;
    // console.log(shouldInvertDirection)
    return (
      <OrcamentoItens item={orcamento} onPress={() => modificarItem(orcamento)} direita={shouldInvertDirection} />
    );
  };


  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <View>
        <AlterarOrcamentoButton
          item={orcamento}
          onClick={() => routeOrcamento(orcamento, 'AlterarOrcamento')}
        />
        <View>
          <View>
            {/* {console.log('item000')}
            {console.log(item)} */}
            {/* <Texto tamanho={40} texto={item.nome} tipo={'orcamento'}></Texto> */}
          </View>
          <View>
            <AdicionarItemButton
              item={orcamento}
              onClick={() => routeOrcamento(orcamento, 'OrcamentoItens')}
            />
            <FlatList
              data={orcamento}
              renderItem={renderItem}
              keyExtractor={orcamento => orcamento.uid}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Orcamento;
