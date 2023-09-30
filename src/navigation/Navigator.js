import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Saloes from '../screens/Saloes';
import Gerenciador from '../screens/Gerenciador';
import AlterarOrcamento from '../screens/Orcamento/alterar';
import NovoOrcamento from '../screens/Orcamento/novo';
import AdicionarItemSalao from '../screens/ItensSaloes/AdicionarItemSalao'
import OrcamentoItens from '../screens/OrcamentoItens';
// import Itens from '../screens/Itens';
import ItensSaloes from '../screens/ItensSaloes';
import Chat from '../screens/Chat';
import Chats from '../screens/Chats';
import Orcamento from '../screens/Orcamento';
import Orcamentos from '../screens/Orcamentos';
import Salao from '../screens/Salao';
import Preload from '../screens/Preload';
import ForgotPassword from '../screens/ForgotPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Manutencao from '../screens/Manutencao';
import AtualizarDados from '../screens/AtualizarDados';

import Menu from '../screens/Menu';
import PerfilUsuario from '../screens/PerfilUsuario';

import { COLORS } from '../assets/colors';
import { StyleSheet, StatusBar } from 'react-native';

import { AuthUserContext } from '../context/AuthUserProvider';
import { Text } from '../screens/PerfilUsuario/styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: true,
    }}>
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SignIn} name="SignIn" options={SignInStyle} />
    <Stack.Screen component={SignUp} name="SignUp" options={SignUpStyle} />
    <Stack.Screen
      component={ForgotPassword}
      name="ForgotPassword"
      options={ForgotPasswordStyle}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const { user } = useContext(AuthUserContext)

  useEffect(() => {
    if (user) {
      console.log('email user conectado: ' + user.email)
      console.log(user)
    }
  }, [user]);

  return (
    <Tab.Navigator
      initialRouteName="Saloes"
      screenOptions={{
        headerShown: true,
      }}>
      <>
        {user && user.tipo == "Cliente" ? (
          <>
            <Tab.Screen
              component={Saloes}
              name="Saloes"
              options={{
                tabBarLabel: 'Home',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: () => <Icon name="home" color={COLORS.primaryDark} />,
              }}
            />
          </>
        ) : (
          <>
            {/* <Tab.Screen
            component={Home}
            name="Saloes"
            options={{
              tabBarLabel: 'Home',
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: () => <Icon name="home" color={COLORS.primaryDark} />,
            }}
            /> */}
            <Tab.Screen
              component={Gerenciador}
              name="Gerenciador"
              options={{
                tabBarLabel: 'Home',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: () => <Icon name="home" color={COLORS.primaryDark} />,
              }}
            />
          </>
        )
        }
        {/* <Tab.Screen
            component={Gerenciador}
            name="Gerenciador"
            options={{
              tabBarLabel: 'Gerenciador',
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: () => <Icon name="home" color={COLORS.primaryDark} />,
            }}
            /> */}
        <Tab.Screen
          component={Menu}
          name="Menu"
          options={{
            tabBarLabel: 'Menu',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: () => <Icon name="list" color={COLORS.primaryDark} />,
          }}
        />
      </>
    </Tab.Navigator>
  );
};

const Navigator = () => (
  <NavigationContainer>
    <StatusBar backgroundColor={COLORS.primary} />
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={AuthStack} name="AuthStack" />
      <Stack.Screen component={AppStack} name="AppStack" />
      <Stack.Screen component={Saloes} name="Saloes" />
      <Stack.Screen component={Manutencao} name="Manutencao" options={{headerShown: true,}}/>
      <Stack.Screen component={AlterarOrcamento} name="AlterarOrcamento" />
      <Stack.Screen component={AdicionarItemSalao} name="AdicionarItemSalao" />
      <Stack.Screen component={NovoOrcamento} name="NovoOrcamento" />
      {/* <Stack.Screen component={Itens} name="Itens" /> */}
      <Stack.Screen component={ItensSaloes} name="ItensSaloes" />
      <Stack.Screen component={OrcamentoItens} name="OrcamentoItens" />
      <Stack.Screen component={Chats} name="Chats" />
      <Stack.Screen component={Chat} name="Chat" />
      <Stack.Screen component={Orcamento} name="Orcamento" />
      <Stack.Screen component={Orcamentos} name="Orcamentos" />
      <Stack.Screen component={AtualizarDados} name="AtualizarDados" />
      <Stack.Screen component={Salao} name="Salao" />
      <Stack.Screen
        component={PerfilUsuario}
        name="PerfilUsuario"
        options={{
          presentation: 'modal',
        }}
      />
      {/* <Stack.Screen component={Salao} name="Salao" /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigator;

const SignInStyle = {
  // headerLeft: false,
  headerTitleAlign: 'center',
  title: 'Bem Vindo',
  headerStyle: { backgroundColor: COLORS.primaryShadow },
  headerTitleStyle: { color: COLORS.black },
};
const SignUpStyle = {
  // headerLeft: false,
  headerTitleAlign: 'center',
  title: 'Cadastre-se',
  headerStyle: { backgroundColor: COLORS.secundary },
  headerTitleStyle: { color: COLORS.primaryDark },
  headerTintColor: COLORS.primaryDark,
};
const ForgotPasswordStyle = {
  headerTitleAlign: 'center',
  title: 'Esqueceu a Senha',
  headerStyle: { backgroundColor: COLORS.secundary },
  headerTitleStyle: { color: COLORS.primaryDark },
  headerTintColor: COLORS.primaryDark,
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});
