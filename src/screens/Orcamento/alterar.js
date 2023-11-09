import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, View } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import MeuButton from '../../components/MeuButton';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { Container, FlatList, Content, TextInput, ViewInput, TextPlaceholder } from './styles';
import { OrcamentosContext } from '../../context/OrcamentosProvider';
import { CommonActions } from '@react-navigation/native';

const AlterarOrcamento = ({ route, navigation }) => {
  // console.log('route')
  // console.log(route)
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorBase, setValorBase] = useState(0);
  const [salaoId, setSalaoId] = useState(0);
  const [id, setId] = useState(0);

  const { updateOrcamento } = useContext(OrcamentosContext);

  const orcamento = route.params.orcamento;
  const salao = route.params.salao;

  const voltar = () => {
    navigation.goBack();
  };

  useEffect(() => {
    // console.log('orcamento123')
    // console.log(orcamento);
    // console.log('salao')
    // console.log(salao);
    // console.log(salao.id);
    setSalaoId(salao.id);
    if (orcamento) {
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
      valorItens: orcamento.valorItens,
      valorTotal: parseFloat(valorBase) + parseFloat(orcamento.valorItens),
    };
    try {
      // console.log('newOrcamento');
      // console.log(newOrcamento);
      await updateOrcamento(id, newOrcamento);
      const newOrcamentoWithId = { ...newOrcamento, id: id };
      // console.log('newOrcamentoWithId')
      // console.log(newOrcamentoWithId)
      // console.log(salao)
      navigation.dispatch(
        CommonActions.navigate({
          // igual ta na tela orcamentos
          name: 'Orcamento',
          params: { orcamento: newOrcamentoWithId, salao: salao },
        }),
      );
    } catch (error) {
      console.error('Erro ao salvar o orçamento:', error);
    }
  };
  const renderPlaceholder = (value) => {
    if (value !== '') {
      return <TextPlaceholder>{value}</TextPlaceholder>;
    }
    return null;
  };


  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <ScrollView>
        <View style={{ marginVertical: 30 }}>
          <Texto tamanho={40} texto={'Alterar Orçamento'} ></Texto>
        </View>
        <ViewInput style={{ marginVertical: 30 }}>
          <View style={{ width: '65%' }} >
            {renderPlaceholder(nome ? 'Nome' : '')}
          </View>
          <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
          <View style={{ width: '65%' }} >
            {renderPlaceholder(descricao ? 'Descrição' : '')}
          </View>
          <TextInput
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            multiline={true}
            style={{ height: 75 }}
          />
          <View style={{ width: '65%' }} >
            {renderPlaceholder(valorBase ? 'Valor Base' : '')}
          </View>
          <TextInput
            keyboardType="numeric"
            placeholder="Valor Base"
            value={valorBase !== 0 ? valorBase.toString() : ''}
            onChangeText={setValorBase}
          />
        </ViewInput>
        <ViewInput style={{ marginVertical: 30 }}>
          <MeuButton texto="Alterar Orçamento" onClick={() => salvar()} />
        </ViewInput>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlterarOrcamento;
