import React, { useEffect, useContext, useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, StyleSheet,
  Modal, TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import { Image } from '../Preload/styles';
// import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import { Container, FlatList } from './styles';
import ContainerImagens from '../../components/Imagens/ContainerImagens';

import { CommonActions } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';
import MeuButtonMetade from '../../components/MeuButtonMetade';
import MeuButton from '../../components/MeuButton';
import { SalaoContext } from '../../context/SalaoProvider';
import { SaloesContext } from '../../context/SaloesProvider';
import { AuthUserContext } from '../../context/AuthUserProvider';
import Texto from '../../components/Texto';

import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import Ads from '../../components/ADs/Ads';

const Gerenciador = ({ navigation }) => {
  const { salao, getHallData } = useContext(SalaoContext);
  const { getHallsData } = useContext(SaloesContext);
  const [saloesTemp, setSaloesTemp] = useState([]);
  const { user } = useContext(AuthUserContext);

  useEffect(() => {
    console.log('gerenciador user')
    console.log(user)
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
      case 'Imagens':
        navigation.dispatch(
          CommonActions.navigate({
            name: item,
            params: { salao: salao },
          }),
        );
        break;
      case 'AtualizarDados':
        navigation.dispatch(
          CommonActions.navigate({
            name: item,
            params: { salao: salao },
          }),
        );
        break;
      case 'GerenciarItens':
        // console.log(salao);
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
            params: { user: salao }
          }),
        );
        break;
      case 'VerAgenda':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Agenda',
            params: { value: salao, cliente: false }
          }),
        );
        break;
      case 'VisaoCliente':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Saloes',
            params: { desabilitarBotoes: true }
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
  //brincadeira ads
  const randomIndex = Math.floor(Math.random() * 2);


  return (
    <SafeAreaView style={styles.container}>
      {/* {randomIndex === 1 ?
        <Ads id='miguel' />
        :
        <Ads id='ifsul' />
      } */}
      <ScrollView>

        <>
          {/* {console.log('salao')}
        {console.log(salao)} */}
          {salao ? (
            <View style={{ alignItems: 'center', margin: 5 }}>
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
          ) : (
            <Texto texto={'Não foi possível carregar o Salão'} />
          )}


        </>
        <Container>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MeuButtonMetade texto="Tela Orçamento" onClick={() => routeGerenciador('TelaOrcamento')} style={{ width: '45%' }} />
            <MeuButtonMetade texto="Atualizar Dados" onClick={() => routeGerenciador('AtualizarDados')} style={{ width: '45%' }} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MeuButtonMetade texto="Ver Agenda" onClick={() => routeGerenciador('VerAgenda')} style={{ width: '45%' }} />
            <MeuButtonMetade texto="Conversar" onClick={() => routeGerenciador('Conversar')} style={{ width: '45%' }} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MeuButtonMetade texto="Visão Cliente" onClick={() => routeGerenciador('VisaoCliente')} style={{ width: '45%' }} />
            <MeuButtonMetade texto="Gerenciar Itens" onClick={() => routeGerenciador('GerenciarItens')} style={{ width: '45%' }} />
          </View>
        </Container>
        <Container>
          <View style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginLeft: 100,
            marginTop: 20
          }}>
            <Texto cor={COLORS.secundary} texto="Imagens" tamanho={35} />
            <View style={styles.edit}>
              <MeuButtonMetade width={'auto'}
                texto={<Icon name="create" size={20} color={COLORS.secundary} />}

                onClick={() => routeGerenciador('Imagens')} />
            </View>
          </View>

          {salao && (
            <>
              <ContainerImagens salao={salao} />
            </>
          )}

        </Container>

        {/* {loading && <Loading />} */}
      </ScrollView>
    </SafeAreaView >
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
  edit: {
    marginLeft: 50
  },
});
