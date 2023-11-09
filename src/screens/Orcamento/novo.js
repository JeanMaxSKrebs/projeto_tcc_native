import React, { useState, useContext } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import MeuButton from '../../components/MeuButton';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { Container, FlatList, Content, ViewInput, TextInput, TextPlaceholder } from './styles';
import { OrcamentosContext } from '../../context/OrcamentosProvider';
import { CommonActions } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';

const NovoOrcamento = ({ route, navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorBase, setValorBase] = useState(0);
  const { orcamento, saveOrcamento } = useContext(OrcamentosContext);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const cliente = route.params.cliente;
  const salao = route.params.salao

  const voltar = () => {
    navigation.goBack();
  };
  // console.log(route.params)

  const salvar = async () => {
    if (!nome || !descricao || valorBase === 0) {
      showToast(`Por favor, preencha todos os campos obrigatórios.`);

      return;
    }
    let newOrcamento;
    cliente ? (
      newOrcamento = {
        cliente_id: cliente.id,
        salao_id: salao.id,
        nome: nome,
        descricao: descricao,
        valorBase: valorBase,
        valorTotal: valorBase,
      }) : (
      newOrcamento = {
        salao_id: salao.id,
        nome: nome,
        descricao: descricao,
        valorBase: valorBase,
        valorTotal: valorBase,
      })
    try {
      console.log('newOrcamento');
      console.log(newOrcamento);
      const newOrcamentoId = await saveOrcamento(newOrcamento);
      const newOrcamentoWithId = { ...newOrcamento, id: newOrcamentoId };
      console.log('newOrcamentoWithId');
      console.log(newOrcamentoWithId);

      navigation.dispatch(
        CommonActions.navigate({
          name: 'Orcamento',
          params: { orcamento: newOrcamentoWithId, salao: salao, cliente: cliente },
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
          <Texto tamanho={40} texto={'Novo Orçamento'} ></Texto>
        </View>

        <ViewInput style={{ marginVertical: 30, backgroundColor: 'red' }}>
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

          <MeuButton texto="Criar Orçamento" onClick={() => salvar()} />
        </ViewInput>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NovoOrcamento;
