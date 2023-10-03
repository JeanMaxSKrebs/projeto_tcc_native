import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import { SaloesContext } from '../../context/SaloesProvider';
import { Image } from '../Preload/styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import { Container, FlatList } from './styles';

import { CommonActions } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';
import { AuthUserContext } from '../../context/AuthUserProvider';
import { ClienteContext } from '../../context/ClienteProvider';
import Texto from '../../components/Texto';
import ListaCidadesButtons from '../../components/saloes/ListaCidadesButtons';

const Saloes = ({ navigation }) => {
  const { user } = useContext(AuthUserContext)
  const { cliente, getClientData} = useContext(ClienteContext)

  const { saloes, getHallsData, cidades, fetchCities, selectSaloesByCity } = useContext(SaloesContext);
  const [saloesTemp, setSaloesTemp] = useState([]);

  console.log('cliente');
  console.log(cliente);
  useEffect(() => {
    getHallsData();
    fetchCities();
    getClientData(user.email);

    navigation.setOptions({
      // headerLeft: () => <LogoutButton />,
      // headerLeft: false,
      headerTitleAlign: 'center',
      title: 'Bem Vindo ' + user.nome.toUpperCase(), // deixei a name pq senao muda o nome da tab
      headerStyle: { backgroundColor: COLORS.primaryDark },
      headerTintColor: { color: COLORS.black },
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogoutButton />,
    });
  }, [navigation]);

  const routeSalao = item => {
    // console.log('a');
    // console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Salao',
        params: { salao: item, user: cliente },
      }),
    );
  };
  const filterSalao = text => {
    // console.log(text);
    let filtro = [];
    saloes.filter(salao => {
      if (salao.nome.toLowerCase().includes(text.toLowerCase())) {
        filtro.push(salao);
      }
    });
    // console.log('filtro');
    // console.log(filtro);
    // console.log(filtro.length);
    if (filtro.length > 0) {
      setSaloesTemp(filtro);
      // console.log(filtro.length);
    } else {
      setSaloesTemp([]);
    }
  };

  const routeAgenda = (item) => {
    // Ação específica quando o botão "Ver Agenda" for clicado
    console.log('Botão "Ver Agenda" foi clicado com argumento:');
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Agenda',
        params: { value: item, cliente: true },
      }),
    );
  };

  const renderItem = ({ item }) => {
    // console.log('item:', item);
    // console.log('item.id:', item.id);

    return (
      <Item item={item} onPress={() => routeSalao(item)} onPressAgenda={() => routeAgenda(item)} />
    );
  };

  const handleCityButtonClick = async (cidade) => {
    // Lógica a ser executada quando um botão de cidade for clicado
    console.log(`Clicou em ${cidade}`);
    setSaloesTemp(await selectSaloesByCity(cidade))

    // Você pode atualizar a lista de salões com base na cidade selecionada
  };


  return (
    <SafeAreaView style={styles.container}>
      <SearchBar search={filterSalao} name={'Salões'} />
      <ListaCidadesButtons cidades={cidades} onCityButtonClick={handleCityButtonClick} />
      <Texto style={styles.texto} cor={COLORS.secundary} tamanho={30} texto={'Salões nas Proximidades'} />
      <Container>
        {/* {console.log('saloes')}
          {console.log(saloes)}
        {console.log('saloesTemp')}
        {console.log(saloesTemp.length)} */}

        <FlatList
          data={saloesTemp.length > 0 ? saloesTemp : saloes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Container>
      {/* {loading && <Loading />} */}
      {/* <AddFloatButton onClick={() => routeSalao(null)} /> */}
    </SafeAreaView>
  );
};

export default Saloes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: COLORS.primaryDark,
  },
  logout: {
    backgroundColor: COLORS.red,
  },
});
