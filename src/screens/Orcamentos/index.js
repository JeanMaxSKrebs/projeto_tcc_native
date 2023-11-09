import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { COLORS } from '../../assets/colors';
import { OrcamentosContext } from '../../context/OrcamentosProvider';
import Item from './Item';
import { useFocusEffect } from '@react-navigation/native';
import { View, Container, FlatList, Content } from './styles';
import LogoutButton from '../../components/LogoutButton';
import Texto from '../../components/Texto';
import Voltar from '../../components/Voltar';
import MeuButton from '../../components/MeuButton';
import { CommonActions } from '@react-navigation/native';

const Orcamentos = ({ route, navigation }) => {
  const { orcamentos, getBudgetData } = useContext(OrcamentosContext);
  const [orcamentosTemp, setOrcamentosTemp] = useState([]);

  const [hasFocused, setHasFocused] = useState(false);

  const voltar = () => {
    navigation.goBack();
  };
  // console.log('orcamentos')
  // console.log(route.params);
  // console.log(route.params.salao);
  // console.log(route.params.itensSaloes);

  let itensSaloes = route.params.itensSaloes;

  const user = route.params.user;
  const dataReserva = route.params.dataReserva;
  const horarioReserva = route.params.horarioReserva;
  const salao = route.params.salao;
  const cliente = route.params.cliente;
  const atualizar = route.params.atualizar;

  { cliente ? imprimirContent = false : imprimirContent = true }

  // console.log('cliente');
  // console.log(cliente);

  const routeOrcamento = item => {
    // console.log('calica');
    // console.log(user);
    // console.log(route.params.value);
    // console.log(route.params.salao);

    switch (item) {
      case 'NovoOrcamento':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'NovoOrcamento',
            params: { salao: salao, cliente: cliente },
          }),
        );
        break;
      case 'GerenciarItens':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'ItensSaloes',
            params: { salao: salao },
          }),
        );
        break;
      default:
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Orcamento',
            params: {
              orcamento: item, salao: salao, cliente: cliente,
              dataReserva: dataReserva, horarioReserva: horarioReserva,
              user: user
            },
          }),
        );
        break;
    }
  };

  console.log('atualizar');
  console.log(atualizar);

  useEffect(() => {
    setHasFocused(false)
  }, [atualizar])

  useFocusEffect(() => {
    // console.log(hasFocused);
    if (!hasFocused) {
      // Código a ser executado quando a tela fica ativa pela primeira vez
      // console.log('entrou orcamentos')
      // console.log(route)
      getBudgetData(salao.id);

      // Marcar que a tela já focou uma vez
      setHasFocused(true);
    }
  });

  const renderItem = ({ item }) => (
    // console.log('itemitemitem'),
    // console.log(item),
    <Item
      item={item}
      onPress={() => {
        routeOrcamento(item);
        setHasFocused(false);
      }}
    />
  );

  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <View style={{ height: '90%' }}>

        <Container>
          <Content>
            <Texto tamanho={40} texto={'Orçamentos'} cor={COLORS.primary} />
          </Content>
          {/* {console.log(orcamentos.length)} */}
          <View style={{ flex: 1 }}>

            <FlatList
              data={orcamentosTemp.length > 0 ? orcamentosTemp : orcamentos}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
          {imprimirContent
            &&
            <Content>

              <MeuButton
                texto="Novo Orçamento"
                cor={COLORS.primary}
                onClick={() => routeOrcamento('NovoOrcamento')}
              />


              <MeuButton
                texto="Gerenciar Itens"
                cor={COLORS.primary}
                onClick={() => routeOrcamento('GerenciarItens')}
              />
            </Content>
          }
        </Container>
      </View>
    </SafeAreaView>
  );
};

export default Orcamentos;
