import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import Saloes from '../screens/Saloes';
import Salao from '../screens/Salao';
import Preload from '../screens/Preload';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Menu from '../screens/Menu';
import PerfilUsuario from '../screens/PerfilUsuario';

import {COLORS} from '../assets/colors';
import {StyleSheet, StatusBar} from 'react-native';

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

const AppStack = () => (
  <Tab.Navigator
    initialRouteName="Saloes"
    screenOptions={{
      headerShown: true,
    }}>
    <Tab.Screen
      component={Saloes}
      name="Saloes"
      options={{
        tabBarLabel: 'Home',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: () => <Icon name="home" color={COLORS.primaryDark} />,
      }}
    />
    <Tab.Screen
      component={Menu}
      name="Menu"
      options={{
        tabBarLabel: 'Menu',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: () => <Icon name="list" color={COLORS.primaryDark} />,
      }}
    />
  </Tab.Navigator>
);

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
  headerStyle: {backgroundColor: COLORS.secundary},
  headerTitleStyle: {color: COLORS.primaryDark},
};
const SignUpStyle = {
  // headerLeft: false,
  headerTitleAlign: 'center',
  title: 'Cadastre-se',
  headerStyle: {backgroundColor: COLORS.secundary},
  headerTitleStyle: {color: COLORS.primaryDark},
  headerTintColor: COLORS.primaryDark,
};
const ForgotPasswordStyle = {
  headerTitleAlign: 'center',
  title: 'Esqueceu a Senha',
  headerStyle: {backgroundColor: COLORS.secundary},
  headerTitleStyle: {color: COLORS.primaryDark},
  headerTintColor: COLORS.primaryDark,
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});
