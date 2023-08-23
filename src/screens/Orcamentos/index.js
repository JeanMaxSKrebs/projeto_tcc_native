import React, {useEffect, useContext, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {COLORS} from '../../assets/colors';
import {OrcamentosContext} from '../../context/OrcamentosProvider';
import Item from './Item';

import {View, Container, FlatList, Content} from './styles';
import LogoutButton from '../../components/LogoutButton';
import Texto from '../../components/Texto'
import Voltar from '../../components/Voltar'
import MeuButton from '../../components/MeuButton';
import {CommonActions} from '@react-navigation/native';

const Orcamentos = ({route, navigation}) => {
  const {orcamentos,  getBudgetData} = useContext(OrcamentosContext);
  const [orcamentosTemp, setOrcamentosTemp] = useState([]);

  const voltar = () => {
    navigation.goBack();
    };

  const routeOrcamento = item => {
    // console.log('calica');
    // console.log(item);
    switch (item) {
      case 'NovoOrcamento':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'NovoOrcamento',
            params: { value: item },
          }),
        );
      break;
      default:
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Orcamento',
            params: { value: item }
          }),
        );
      break;
    }
  };

  useEffect(() => {
    // console.log('entrou orcamentos')
    // console.log(route)
    getBudgetData();
  }, []);

    const renderItem = ({item}) => (
      // console.log('itemitemitem'),
      // console.log(item),
        <Item item={item} onPress={() => routeOrcamento(item)} />
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
          <Content style={{ padding: 20 }}>
            <Texto tamanho={40} texto={'Orçamentos'} cor={COLORS.primary}/>
          </Content>
            
          <FlatList
            data={orcamentosTemp.length > 0 ? orcamentosTemp : orcamentos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            />
          <Content>
              <MeuButton texto="Novo Orçamento" cor={COLORS.primary}  onClick={() => routeOrcamento('NovoOrcamento')}/>
          </Content>
          </Container>
      </View>
    </SafeAreaView>
  );
};

export default Orcamentos;
