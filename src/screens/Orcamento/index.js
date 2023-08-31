import React, { useState } from 'react';
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

const Orcamento = ({ route, navigation }) => {
  // console.log(route)
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorBase, setValorBase] = useState('');
  const [valorTotal, setValorTotal] = useState('');

  const item = route.params.value;
  const salao = route.params.salao;

  const voltar = () => {
    navigation.goBack();
  };

  const routeOrcamento = (item, nextView) => {
    // console.log("TESTE")
    // console.log(item)
    // console.log(route)
    navigation.dispatch(
      CommonActions.navigate({
        name: nextView,
        params: { orcamento: item, salao: salao },
      }),
    );

  }


  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <View>
        <AlterarOrcamentoButton
          item={item}
          onClick={() => routeOrcamento(item, 'AlterarOrcamento')}
        />
        <View>
          <View>
            {/* {console.log('item000')}
            {console.log(item)} */}
            {/* <Texto tamanho={40} texto={item.nome} tipo={'orcamento'}></Texto> */}
          </View>
          <View>
            <AdicionarItemButton
              item={item}
              onClick={() => routeOrcamento(item, 'Itens')}
            />
            <OrcamentoItens item={item} salao={salao}></OrcamentoItens>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Orcamento;
