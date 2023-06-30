import React, {useEffect, useContext, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import {SaloesContext} from '../../context/SaloesProvider';
import {Image} from '../Preload/styles';
// import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import { Container, FlatList } from './styles';

import {CommonActions} from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';
import MeuButton from '../../components/MeuButton';
import { SalaoContext } from '../../context/SalaoProvider';
import {AuthUserContext} from '../../context/AuthUserProvider';

const Gerenciador = ({navigation, user}) => {
  const {salao} = useContext(SalaoContext);
  const [saloesTemp, setSaloesTemp] = useState([]);

  useEffect(() => {

    navigation.setOptions({
      // headerLeft: () => <LogoutButton />,
      // headerLeft: false,
      headerTitleAlign: 'center',
      // name: 'GERENCIA LIVROS',
      title: 'GERENCIADOR DE SALÕES', // deixei a name pq senao muda o nome da tab
      headerStyle: {backgroundColor: COLORS.primaryDark},
      headerTintColor: {color: COLORS.black},
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogoutButton />,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
        <>
        {console.log('salao')}
        {console.log(salao)}
        {console.log('user')}
        {console.log(user)}
        
          <View>
            <Image
              // source={{uri: image}}//TODO
              // key={image}
              style={{width: 320, height: 300, borderRadius: 15}}
            />
          </View>
        </>
        <Container>
          <MeuButton></MeuButton>
          <MeuButton></MeuButton>
          <MeuButton></MeuButton>
          <MeuButton></MeuButton>
        </Container>
      {/* {loading && <Loading />} */}
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
