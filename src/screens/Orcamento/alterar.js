import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import MeuButton from '../../components/MeuButton';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { Container, FlatList, Content, TextInput,  View} from './styles';


const AlterarOrcamento = ({route, navigation}) => {
  // console.log(route)
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorBase, setValorBase] = useState('');
  const [valorTotal, setValorTotal] = useState('');

  const item = route.params.value;
  
  const voltar = () => {
    navigation.goBack();
  };
  
  const routeOrcamento = item => {
    // console.log("TESTE")
    // console.log(item)
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Orcamento',
        params: { value: item },
      }),
    );
  };
  
  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <View>
        <View>
          <View>
            {console.log('item123')}
            {/* {console.log(item)} */}
            <Texto tamanho={40} texto={nome} tipo={'orcamento'}></Texto>
          </View>
          <View>
            <TextInput
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              placeholder="Descrição"
              value={descricao}
              onChangeText={setDescricao}
            />
            <TextInput
              placeholder="Preço "
              value={valorBase}
              onChangeText={setValorBase}
            />
          </View>
        </View>
        <MeuButton texto="Alterar Orçamento" onClick={() => routeOrcamento()} />
        <MeuButton texto="Voltar" onClick={() => voltar()} />
      </View>
    </SafeAreaView>
  );
};

export default AlterarOrcamento;
