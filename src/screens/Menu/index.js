import React, {useContext, useEffect} from 'react';
import {FlatList, Alert} from 'react-native';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {CommonActions} from '@react-navigation/native';
import Item from './Item';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';

const Menu = ({navigation}) => {
  const {signOut} = useContext(AuthUserContext);

  useEffect(() => {
    navigation.setOptions({
      // headerLeft: false,
      headerTitleAlign: 'center',
      // name: 'GERENCIA LIVROS',
      title: 'BIBLIOTECA // MENU', // deixei a name pq senao muda o nome da tab
      headerStyle: {backgroundColor: COLORS.primaryDark},
      headerTintColor: {color: COLORS.black},
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogoutButton />,
    });
  }, [navigation]);

  function processar(opcao) {
    switch (opcao) {
      case 'Perfil':
        navigation.navigate('PerfilUsuario');
        break;
      case 'Sair':
        sair();
        break;
    }
  }

  function sair() {
    if (signOut()) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AuthStack'}],
        }),
      );
    } else {
      Alert.alert(
        'Ops!',
        'Estamos com problemas para realizar essa operação.\nPor favor, contate o administrador.',
      );
    }
  }

  return (
    <FlatList
      data={[
        {key: 1, opcao: 'Perfil', iconName: 'person'},
        {key: 2, opcao: 'Sair', iconName: 'log-in-sharp'},
      ]}
      renderItem={({item}) => (
        <Item
          opcao={item.opcao}
          icon={item.iconName}
          onPress={() => processar(item.opcao)}
        />
      )}
      keyExtractor={item => item.key}
    />
  );
};
export default Menu;

