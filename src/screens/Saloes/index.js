import React, {useEffect, useContext, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import {SaloesContext} from '../../context/SaloesProvider';
import {Image} from '../Preload/styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import { Container, FlatList } from './styles';

import {CommonActions} from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';

const Saloes = ({navigation, user}) => {
  const {saloes} = useContext(SaloesContext);
  const [saloesTemp, setSaloesTemp] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      // headerLeft: () => <LogoutButton />,
      // headerLeft: false,
      headerTitleAlign: 'center',
      // name: 'GERENCIA LIVROS',
      title: 'SALÕES', // deixei a name pq senao muda o nome da tab
      headerStyle: {backgroundColor: COLORS.primaryDark},
      headerTintColor: {color: COLORS.black},
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogoutButton />,
    });
  }, [navigation]);

  const routeSalao = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Salao',
        params: {value: item},
      }),
    );
  };
  const filterSalao = text => {
    // console.log(text);
    let filtro = [];
    saloes.filter(livro => {
      if (livro.nome.toLowerCase().includes(text.toLowerCase())) {
        filtro.push(livro);
      }
    });
    // console.log('filtro');
    // console.log(filtro);
    console.log(filtro.length);
    if (filtro.length > 0) {
      setSaloesTemp(filtro);
      console.log(filtro.length);
    } else {
      setSaloesTemp([]);
    }
  };

  const renderItem = ({ item }) => (
    <Item key={item.nome} item={item} 
    // onPress={() => routeSalao(item)}
     />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar search={filterSalao} name={'Salões'} />
        <Text style={styles.texto}> Coleções dos Saloes </Text>
        <Container>

          {/* {console.log('saloes')}
          {console.log(saloes)} */}
          {/* {console.log('saloesTemp')}
          {console.log(saloesTemp.length)} */}
          {/* {console.log('saloes.id')} */}
          {/* {console.log(saloes[0].id)}
          {console.log(saloes)} */}
          <FlatList
            data={saloesTemp.length > 0 ? saloesTemp : saloes}
            renderItem={renderItem}
            />
        </Container>
      {/* {loading && <Loading />} */}
      <AddFloatButton onClick={() => routeSalao(null)} />
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
