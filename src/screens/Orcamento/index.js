import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import AlterarOrcamentoButton from '../../components/AlterarOrcamentoButton';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { Container, FlatList, Content, TextInput,  View} from './styles';
import {CommonActions} from '@react-navigation/native';


const Orcamento = ({route, navigation}) => {
  // console.log(route)
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorBase, setValorBase] = useState('');
  const [valorTotal, setValorTotal] = useState('');

  const item = route.params.value;
  
  const voltar = () => {
    navigation.goBack();
  };
  // ({item}) 
  const routeOrcamento = item => {
    // console.log("TESTE")
    // console.log(item)
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AlterarOrcamento',
        params: { value: item },
      }),
    );
  };
  
  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <View>
          <AlterarOrcamentoButton item={item} onClick={() => routeOrcamento(item)} />
        <View>
          <View>
            {/* {console.log('item000')}
            {console.log(item)} */}
            <Texto tamanho={40} texto={nome} tipo={'orcamento'}></Texto>
          </View>
          <View>
            <Texto texto={'AI CALICA'}></Texto>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Orcamento;
