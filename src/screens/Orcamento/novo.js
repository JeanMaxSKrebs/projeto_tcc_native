import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import MeuButton from '../../components/MeuButton';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { View, Container, FlatList, Content, TextInput } from './styles';
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

  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <View>
        <View>
          <Texto tamanho={40} texto={'NOVO ORÇAMENTO'}></Texto>
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
            value={valorBase !== 0 ? valorBase.toString() : ""}
            onChangeText={setValorBase}
          />
        </View>

        <MeuButton texto="Criar Orçamento" onClick={() => salvar()} />
        <MeuButton texto="Voltar" onClick={() => voltar()} />
      </View>
    </SafeAreaView>
  );
};

export default NovoOrcamento;
