import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import MeuButton from '../../components/MeuButton';

const NovoOrcamento = ({  navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const voltar = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    // Perform actions with the submitted nome and descricao values
  };

  return (
    <SafeAreaView>
        <Voltar texto="Voltar" onClick={() => voltar()} />
        <View style={styles.container}>
        <Text style={styles.texto}>NOVO ORÇAMENTO</Text>
        <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
        />
        <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
        />

        <MeuButton texto="Criar Orçamento" onClick={() => handleSubmit} />
        <MeuButton texto="Voltar" onClick={() => voltar()} />
        </View>
    </SafeAreaView>
  );
};

export default NovoOrcamento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  texto: {
    fontSize: 40,
    color: COLORS.red,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.secundary,
    borderRadius: 5,
  },
});
