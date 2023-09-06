import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import AlterarOrcamentoButton from '../../components/Orcamento/AlterarOrcamentoButton';
import AdicionarItemButton from '../../components/Orcamento/AdicionarItemButton';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { Container, FlatList, Content, TextInput, View } from './styles';
import { CommonActions } from '@react-navigation/native';
import { ItensOrcamentosContext } from '../../context/ItensOrcamentosProvider.js';
import ListaItensOrcamentos from '../../components/ItensOrcamentos/ListaItensOrcamentos';

const Orcamento = ({ route, navigation }) => {
  const { itensOrcamentos, getItensOrcamentos, updateItemItensSaloes } = useContext(ItensOrcamentosContext);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorBase, setValorBase] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const acao = "adicionar"; // variável que muda o tipo do item (atualizar, adicionar, excluir(qualquer escrita))
  let contador = 0;

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const salao = route.params.salao;
  const orcamento = route.params.orcamento;
  useEffect(() => {
    // console.log('entrou ItensOrcamentos');
    // console.log(route.params);
    // console.log(route.params.salao);
    // console.log(route.params.orcamento);
    // console.log('itensOrcamentos');
    // console.log(itensOrcamentos);
    getItensOrcamentos(orcamento.id)

    // {
    //   ?  }
  }, []);

  const voltar = () => {
    navigation.goBack();
  };

  const routeOrcamento = (orcamento, nextView) => {
    // console.log("TESTE")
    // console.log(orcamento)
    // console.log(salao)
    // console.log(route)
    navigation.dispatch(
      CommonActions.navigate({
        name: nextView,
        params: { orcamento: orcamento, salao: salao },
      }),
    );
  }

  const modificarItem = (orcamento) => {
    setSelectedItem(orcamento);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    console.log('item123');
    console.log(item.id);

    contador++;
    const shouldInvertDirection = contador % 2 === 1;
    // console.log(shouldInvertDirection)
    return (
      <ListaItensOrcamentos itemOrcamento={item} isModalVisible acao={acao} direita={shouldInvertDirection} onPress={(item) => handlePress(item)} />
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
              data={itensOrcamentos}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Orcamento;
