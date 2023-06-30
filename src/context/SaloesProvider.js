import React, {createContext, useEffect, useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native' 
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import supabase from '../services/supabase';
import {AuthUserContext} from './AuthUserProvider';

export const SaloesContext = createContext({});

export const SaloesProvider = ({children}) => {
  const [saloes, setSaloes] = useState([]);
  const {user, getUser, signOut} = useContext(AuthUserContext);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getHallsData = async () => {
    const {data} = supabase.get('/saloes');
    console.log(response.data);

    setSaloes(data);
  }
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log("entrou saloes")
    console.log(user)
    fetchData();

  }, []);

const fetchData = async () => {
    try {
      const { data, error } = await supabase.get('saloes');
  
      if (error) {
        console.error('Erro ao buscar os salões:', error);
        return;
      }
  
      const saloes = data.map((salao) => ({
        id: salao.id,
        nome: salao.nome,
        email: salao.email,
        autor: salao.autor,
        descricao: salao.descricao,
        volume: salao.volume,
        cnpj: salao.cnpj,
        endereco: salao.endereco,
        cidade: salao.cidade,
        capacidade: salao.capacidade,
        logo: salao.logo,
        imagens: salao.imagens,
      }));
  
      setSaloes(saloes);
    } catch (error) {
      console.error('Erro ao buscar os salões:', error);
    }
  };
  



  const saveHall = async hall => {
    // console.log(hall)
    try {
      await firestore().collection('saloes').doc(hall.uid).set(
        {
          nome: hall.nome,
          email: hall.email,
          descricao: hall.descricao,
          cnpj: hall.cnpj,
          endereco: hall.endereco,
          cidade: hall.cidade,
          capacidade: hall.capacidade,
          logo: hall.logo,
          imagens: hall.imagens,
        },
        {merge: true},
      );
      return true;
    } catch (error) {
      console.error('HallProvider, saveHall: ', error);
      return false;
    }
  };

  return (
    <SaloesContext.Provider value={{saloes, saveHall}}>
      {children}
    </SaloesContext.Provider>
  );
};
