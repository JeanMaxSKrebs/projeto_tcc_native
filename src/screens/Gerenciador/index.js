import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import { Image } from '../Preload/styles';
// import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import { Container, FlatList } from './styles';

import { CommonActions } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';
import MeuButtonMetade from '../../components/MeuButtonMetade';
import MeuButton from '../../components/MeuButton';
import { SalaoContext } from '../../context/SalaoProvider';
import { SaloesContext } from '../../context/SaloesProvider';
import { AuthUserContext } from '../../context/AuthUserProvider';

const Gerenciador = ({ navigation }) => {
  const { salao, getHallData } = useContext(SalaoContext);
  const { getHallsData } = useContext(SaloesContext);
  const [saloesTemp, setSaloesTemp] = useState([]);
  const { user } = useContext(AuthUserContext);

  useEffect(() => {
    // console.log('gerenciador user')
    // console.log(user)
    if (user) {
      getHallData();
      getHallsData();
    }
    navigation.setOptions({
      // headerLeft: () => <LogoutButton />,
      // headerLeft: false,
      headerTitleAlign: 'center',
      title: 'GERENCIADOR DE SALÕES', // deixei a name pq senao muda o nome da tab
      headerStyle: { backgroundColor: COLORS.primaryDark },
      headerTintColor: { color: COLORS.black },
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogoutButton />,
    });
  }, [navigation, user]);

  const routeGerenciador = item => {
    // console.log('gerenciador');
    // console.log(item);
    switch (item) {
      case 'AtualizarDados':
        navigation.dispatch(
          CommonActions.navigate({
            name: item,
            params: { salao: salao },
          }),
        );
        break;
      case 'GerenciarItens':
        console.log(salao);
        navigation.dispatch(
          CommonActions.navigate({
            name: 'ItensSaloes',
            params: { salao: salao },
          }),
        );
        break;
      case 'TelaOrcamento':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Orcamentos',
            params: { salao: salao }
          }),
        );
        break;
      case 'Conversar':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Chats',
            params: { salao: salao }
          }),
        );
        break;
      // case 'TelaReservas':
      // case 'VerAgenda':
      // case 'Conversar':
      case 'VisaoCliente':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Saloes',
          }),
        );
        break;
      default:
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Manutencao',
            params: { value: item }
          }),
        );
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <>
          {/* {console.log('salao')}
        {console.log(salao)} */}
          <View style={{ alignItems: 'center' }}>
            {salao.logo && (
              <Image
                source={{ uri: salao.logo }}
                key={salao.logo}
                style={{ width: 320, height: 300, borderRadius: 15 }}
              />
            )}
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={styles.nome} >{salao.nome}</Text>
              <Text style={styles.descricao} >{salao.descricao}</Text>
              <Text style={styles.endereco}>{salao.endereco}</Text>
              <Text style={styles.cidade}>{salao.cidade}</Text>
              <Text style={styles.capacidade}>Capacidade: {salao.capacidade}</Text>
            </View>
          </View>


        </>
        <Container>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MeuButtonMetade texto="Tela Orçamento" onClick={() => routeGerenciador('TelaOrcamento')} style={{ width: '45%' }} />
            <MeuButtonMetade texto="Tela de Reservas" onClick={() => routeGerenciador('TelaReservas')} style={{ width: '45%' }} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MeuButtonMetade texto="Ver Agenda" onClick={() => routeGerenciador('VerAgenda')} style={{ width: '45%' }} />
            <MeuButtonMetade texto="Conversar" onClick={() => routeGerenciador('Conversar')} style={{ width: '45%' }} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MeuButtonMetade texto="Visão Cliente" onClick={() => routeGerenciador('VisaoCliente')} style={{ width: '45%' }} />
            <MeuButtonMetade texto="Gerenciar Itens" onClick={() => routeGerenciador('GerenciarItens')} style={{ width: '45%' }} />
          </View>
          <MeuButtonMetade texto="Atualizar Dados" onClick={() => routeGerenciador('AtualizarDados')} style={{ width: '45%' }} />
        </Container>
        {/* {loading && <Loading />} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Gerenciador;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nome: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: COLORS.secundary,
  },
  descricao: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: COLORS.secundary,
  },
  endereco: {
    fontSize: 14,
    color: COLORS.terciary,
  },
  cidade: {
    fontSize: 14,
    color: COLORS.terciary,
  },
  capacidade: {
    fontSize: 14,
    color: COLORS.terciary,
  },
  texto: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: COLORS.primaryDark,
  },
  logout: {
    backgroundColor: COLORS.red
  },
});
