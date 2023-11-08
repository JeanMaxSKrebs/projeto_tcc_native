import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import { SaloesContext } from '../../context/SaloesProvider';
import { Image } from '../Preload/styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import { Container, FlatList, ContainerTitle } from './styles';

import { CommonActions } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';
import { AuthUserContext } from '../../context/AuthUserProvider';
import { ClienteContext } from '../../context/ClienteProvider';
import Texto from '../../components/Texto';
import ListaCidadesButtons from '../../components/saloes/ListaCidadesButtons';

import MeuButtonCidade from '../../components/MeuButtonCidade';

const Saloes = ({ navigation }) => {
  const { user } = useContext(AuthUserContext)
  const { cliente, getClientData } = useContext(ClienteContext)

  const { saloes, getHallsData, cidades, fetchCities, selectSaloesByCity } = useContext(SaloesContext);
  const [saloesCidadeTemp, setSaloesCidadeTemp] = useState([]);
  const [saloesTemp, setSaloesTemp] = useState([]);
  const [cidade, setCidade] = useState(null);
  const [mostrarListaCidades, setMostrarListaCidades] = useState(false);

  useEffect(() => {
    // console.log('cliente');
    // console.log(cliente);
  }, [cliente]);

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
    console.log('text');
    console.log(text);
    console.log('cidade');
    console.log(cidade);
    // console.log('saloesTemp');
    // console.log(saloesTemp);
    let filtro = [];
    if (cidade == null) {
      console.log(`filtro de todos os registros`);

      saloes.filter(salao => {
        if (salao.nome.toLowerCase().includes(text.toLowerCase())) {
          filtro.push(salao);
        }
      });
      if (filtro.length > 0) {
        setSaloesTemp(filtro);
        // console.log(filtro.length);
      } else {
        setCidade(null)
        setSaloesTemp([])
      }
    } else {
      console.log(`filtro de todos os registros de ${cidade}`);

      saloesTemp.filter(salao => {
        if (salao.nome.toLowerCase().includes(text.toLowerCase())) {
          filtro.push(salao);
        }
      });
      if (filtro.length > 0) {
        setSaloesCidadeTemp(filtro);
        // console.log(filtro.length);
      } else {
        console.log('nada');
        setSaloesCidadeTemp([])
      }
    }

    // console.log('filtro');
    // console.log(filtro);
    // console.log(filtro.length);

  };

  const routeAgenda = (item) => {
    // Ação específica quando o botão "Ver Agenda" for clicado
    // console.log('Botão "Ver Agenda" foi clicado com argumento:');
    // console.log(item);
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
    if (cidade !== 'HOME') {
      // Lógica a ser executada quando um botão de cidade for clicado
      console.log(`Clicou em ${cidade}`);
      setCidade(cidade)
      setSaloesCidadeTemp([])
      setSaloesTemp(await selectSaloesByCity(cidade))
    } else {
      setSaloesCidadeTemp([])
      setCidade(null)
      setSaloesTemp([])

    }
    setMostrarListaCidades(false)
  };

  return (
    <SafeAreaView style={styles.container}>

      <SearchBar logo={
        cliente
          ? (user.tipo === "Cliente"
            ? cliente.foto_perfil
            : salao.logo)
          : 'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/public/perfil/icone-de-perfil-de-avatar_188544-4755.png'}
        search={filterSalao} name={'Salões'}
      />
      {!mostrarListaCidades && (
        <MeuButtonCidade onClick={() => setMostrarListaCidades(true)}
          texto={'Lista de Cidades'} />
      )}
      {mostrarListaCidades && (
        <ListaCidadesButtons cidades={cidades} onCityButtonClick={handleCityButtonClick} />
      )}
      {cidade ?
        <ContainerTitle>
          <Texto cor={COLORS.secundary} tamanho={20} texto={'Salões nas Proximidades de'} />
          <Texto cor={COLORS.secundary} tamanho={20} texto={`${cidade}`} />
        </ContainerTitle>
        :
        <ContainerTitle>
          <Texto cor={COLORS.secundary} tamanho={20} texto={'Salões nas Proximidades'} />
        </ContainerTitle>

      }
      <Container>
        {/* {console.log('saloes')}
          {console.log(saloes)}
        {console.log('saloesTemp')}
        {console.log(saloesTemp.length)} */}

        <FlatList
          data={saloesCidadeTemp.length > 0 ? saloesCidadeTemp : saloesTemp.length > 0 ? saloesTemp : saloes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Container>

      {/* <ContainerTitle>
    <Texto cor={COLORS.secundary} tamanho={30} texto={'Nenhum Salão nas proximidades'} />

    <Texto cor={COLORS.secundary} tamanho={30} texto={`${cidade}`} />
  </ContainerTitle> */}

      {/* {loading && <Loading />} */}
      {/* <AddFloatButton onClick={() => routeSalao(null)} /> */}
    </SafeAreaView >
  );
};

export default Saloes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logout: {
    backgroundColor: COLORS.red,
  },
});
