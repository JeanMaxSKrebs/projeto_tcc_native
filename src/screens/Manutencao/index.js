import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import MeuButton from '../../components/MeuButton'
const Manutencao = ({route, navigation}) => {

    const item  = route.params.value;

  useEffect(() => {
    navigation.setOptions({
      // headerLeft: false,
      headerTitleAlign: 'center',
      title: 'BEM VINDO', // deixei a name pq senao muda o nome da tab
      headerStyle: {backgroundColor: COLORS.red},
      headerTintColor: {color: COLORS.black},
      headerRight: () => <LogoutButton />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const voltar = () => {
    navigation.goBack();
    };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>TELA EM MANUTENÇÃO</Text>
      <Text style={styles.textoMenor}>EM BREVE PODERÁ ACESSAR A FUNCIONALIDADE DO SISTEMA: </Text>
      <Text style={styles.texto} >{item}</Text>

        <MeuButton texto="Voltar" onClick={() => voltar()} />
    </View>
  );
};

export default Manutencao;

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
