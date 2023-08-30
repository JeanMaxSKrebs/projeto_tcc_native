import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import MeuButton from '../../components/MeuButton';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import {Container, FlatList, Content, TextInput, View} from './styles';
import {OrcamentosContext} from '../../context/OrcamentosProvider';
import {CommonActions} from '@react-navigation/native';

const AlterarOrcamento = ({route, navigation}) => {
  // console.log(route)
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorBase, setValorBase] = useState(0);
  const [salaoId, setSalaoId] = useState(0);
  const [id, setId] = useState(0);

  const {orcamento, updateOrcamento} = useContext(OrcamentosContext);

  const item = route.params.value;
  const salao = route.params.salao;

  const voltar = () => {
    navigation.goBack();
  };

  useEffect(() => {
    // console.log('item123')
    // console.log(item.id);
    // console.log(salao.id);
    setSalaoId(salao.id);
    setId(item.id);
    setNome(item.nome);
    setDescricao(item.descricao);
    setValorBase(item.valorBase);
  }, []);

  const salvar = async () => {
    const newOrcamento = {
      salao_id: salaoId,
      nome: nome,
      descricao: descricao,
      valorBase: valorBase,
    };
    try {
      await updateOrcamento(id, newOrcamento);
      const newOrcamentoWithId = {...newOrcamento, id: id};

      navigation.dispatch(
        CommonActions.navigate({
          name: 'Orcamento',
          params: {value: newOrcamentoWithId},
        }),
      );
    } catch (error) {
      console.error('Erro ao salvar o orçamento:', error);
    }
  };

  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <View>
        <View>
          <View>
            {/* {console.log('item123')} */}
            {/* {console.log(item)} */}
            <Texto tamanho={40} texto={nome} tipo={'orcamento'}></Texto>
          </View>
          <View>
            <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
            <TextInput
              placeholder="Descrição"
              value={descricao}
              onChangeText={setDescricao}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="Valor Base"
              value={valorBase !== 0 ? valorBase.toString() : ''}
              onChangeText={setValorBase}
            />
          </View>
        </View>
        <MeuButton texto="Alterar Orçamento" onClick={() => salvar()} />
        <MeuButton texto="Voltar" onClick={() => voltar()} />
      </View>
    </SafeAreaView>
  );
};

export default AlterarOrcamento;