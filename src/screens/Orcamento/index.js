import React, {useEffect} from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet } from 'react-native';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import MeuButton from '../../components/MeuButton'
import Voltar from '../../components/Voltar'
const Orcamento = ({route, navigation}) => {

  const item  = route.params.value;

  const voltar = () => {
    navigation.goBack();
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

export default Orcamento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  texto: {
    textAlign: 'center', // Add this line to center align the text
    fontSize: 40,
    color: COLORS.red,
    marginBottom: 20,
  },
  textoMenor: {
    textAlign: 'center', // Add this line to center align the text
    fontSize: 20,
    color: COLORS.secundary,
    marginBottom: 20,
  },
  logout: {
    backgroundColor: COLORS.red,
  },
});
