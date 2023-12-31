import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../assets/colors';
import LogoutButton from '../components/LogoutButton';

const Home = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      // headerLeft: false,
      headerTitleAlign: 'center',
      title: 'BEM VINDO', // deixei a name pq senao muda o nome da tab
      headerStyle: {backgroundColor: COLORS.primaryDark},
      headerTintColor: {color: COLORS.black},
      headerRight: () => <LogoutButton />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>GERENCIE SEUS SALÕES</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    textAlign: 'center', // Add this line to center align the text
    fontSize: 50,
    color: COLORS.primaryDark,
  },
  logout: {
    backgroundColor: COLORS.red,
  },
});
