import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import MeuButton from '../../components/MeuButton';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import {View, Container, FlatList, Content, TextInput} from './styles';

const NovoOrcamento = ({  navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [precoBase, setPrecoBase] = useState('');

  const voltar = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    // Perform actions with the submitted nome and descricao values
  };

  return (
    <SafeAreaView>
        <Voltar texto="Voltar" onClick={() => voltar()} />
        <View>
          <View>
          <Texto tamanho={40} texto={'NOVO ORÇAMENTO'}></Texto>
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
                keyboardType="numeric"
                placeholder="Preço Base"
                value={precoBase}
                onChangeText={setPrecoBase}
                />
          </View>

          <MeuButton texto="Criar Orçamento" onClick={() => handleSubmit} />
          <MeuButton texto="Voltar" onClick={() => voltar()} />
          </View>
    </SafeAreaView>
  );
};

export default NovoOrcamento;
