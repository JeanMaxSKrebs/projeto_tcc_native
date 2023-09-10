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
import ItemButton from '../../components/Itens/ItemButton';
import ListaItensOrcamentos from '../../components/ItensOrcamentos/ListaItensOrcamentos';
import ItemModal from '../../components/Itens/modal';

const Orcamento = ({ route, navigation }) => {
  const { itensOrcamentos, getItensOrcamentos, setItensOrcamentos, updateItemItensOrcamentos } = useContext(ItensOrcamentosContext);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorBase, setValorBase] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const acao = "atualizar"; // variável que muda o tipo do item (atualizar, adicionar, excluir(qualquer escrita))
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
    setItensOrcamentos(getItensOrcamentos(orcamento.id))

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

  const abrirModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const opcao = (newItem) => {
    // console.log('newItem.situacao');
    // console.log(newItem.situacao);
    switch (newItem.situacao) {
      case 'atualizar':
        // console.log('newItem123');
        // console.log(newItem);
        if (updateItemItensOrcamentos(newItem)) {
          setItensOrcamentos(getItensOrcamentos(orcamento.id))
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
            <AdicionarItemButton
              item={orcamento}
              onClick={() => routeOrcamento(orcamento, 'OrcamentoItens')}
            />

            <Content style={{height: 250}}>
              <Texto tamanho={25} texto={'Itens Disponibilizados'}></Texto>
              <FlatList
                data={itensOrcamentos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </Content>
            {renderModal()}

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Orcamento;
