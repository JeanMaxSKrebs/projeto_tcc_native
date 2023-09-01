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

  const {updateOrcamento} = useContext(OrcamentosContext);

  const orcamento = route.params.orcamento;
  const salao = route.params.salao;

  const voltar = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log('orcamento123')
    console.log(orcamento);
    console.log('salao')
    console.log(salao);
    // console.log(salao.id);
    setSalaoId(salao.id);
    if(orcamento) {
      setId(orcamento.id);
      setNome(orcamento.nome);
      setDescricao(orcamento.descricao);
      setValorBase(orcamento.valorBase);
    }
  }, []);

  const salvar = async () => {
    const newOrcamento = {
      salao_id: salaoId,
      nome: nome,
      descricao: descricao,
      valorBase: valorBase,
      valorTotal: valorBase,
    };
    try {
      await updateOrcamento(id, newOrcamento);
      const newOrcamentoWithId = {...newOrcamento, id: id};
      console.log('newOrcamentoWithId')
      console.log(newOrcamentoWithId)
      console.log(salao)
      navigation.dispatch(
        CommonActions.navigate({
          // igual ta na tela orcamentos
          name: 'Orcamento',
          params: {value: newOrcamentoWithId, salao: salao},
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
