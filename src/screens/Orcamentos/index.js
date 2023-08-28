import React, {useEffect, useContext, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {COLORS} from '../../assets/colors';
import {OrcamentosContext} from '../../context/OrcamentosProvider';
import Item from './Item';
import {useFocusEffect} from '@react-navigation/native';
import {View, Container, FlatList, Content} from './styles';
import LogoutButton from '../../components/LogoutButton';
import Texto from '../../components/Texto';
import Voltar from '../../components/Voltar';
import MeuButton from '../../components/MeuButton';
import {CommonActions} from '@react-navigation/native';

const Orcamentos = ({route, navigation}) => {
  const {orcamentos, getBudgetData} = useContext(OrcamentosContext);
  const [orcamentosTemp, setOrcamentosTemp] = useState([]);

  const voltar = () => {
    navigation.goBack();
  };

  const routeOrcamento = item => {
    // console.log('calica');
    // console.log(item);
    // console.log(route.params.value);
    // console.log(route.params.salao);

    switch (item) {
      case 'NovoOrcamento':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'NovoOrcamento',
            params: {value: route.params.value, salao: route.params.salao},
          }),
        );
        break;
      case 'GerenciarItens':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Itens',
            params: {value: route.params.value, salao: route.params.salao},
          }),
        );
        break;
      default:
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Orcamento',
            params: {value: item, salao: route.params.salao},
          }),
        );
        break;
    }
  };
  const [hasFocused, setHasFocused] = useState(false);
  useFocusEffect(() => {
    console.log(hasFocused);
    if (!hasFocused) {
      // Código a ser executado quando a tela fica ativa pela primeira vez
      // console.log('entrou orcamentos')
      // console.log(route)
      getBudgetData(route.params.salao.id);

      // Marcar que a tela já focou uma vez
      setHasFocused(true);
    }
  });

  const renderItem = ({item}) => (
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
      <View>
        {/* {console.log('orcametno item: ' + item)} */}
        {/* {console.log('orcametno temp: ' + orcamentosTemp)} */}
        {/* {console.log('orcametnos: ' + orcamentos)} */}
        {/* {console.log('1')}
      {console.log(orcamentos)}
    {console.log('2')} */}
        {/* {console.log(orcamentos[0].nome)} */}
        {/* <Text>{orcamentos[0].nome}</Text> */}

        <Container>
          <Content style={{padding: 20}}>
            <Texto tamanho={40} texto={'Orçamentos'} cor={COLORS.primary} />
          </Content>
          {console.log(orcamentos.length)}
          <FlatList
            data={orcamentosTemp.length > 0 ? orcamentosTemp : orcamentos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
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
        </Container>
      </View>
    </SafeAreaView>
  );
};

export default Orcamentos;
