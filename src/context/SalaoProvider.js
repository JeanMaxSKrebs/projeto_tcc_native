import React, {createContext, useEffect, useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native' 
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import supabase from '../services/supabase';

import {AuthUserContext} from './AuthUserProvider';

export const SalaoContext = createContext({});

export const SalaoProvider = ({children}) => {
  const [salao, setSalao] = useState([]);
  const {user, getUser, signOut} = useContext(AuthUserContext);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    // console.log("entrou salao")
    console.log(user)
    // fetchData();
    getHallData();

  }, []);
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getHallData = async () => {
    console.log(user);
    console.log('user123');

    const {data} = supabase.get('/saloes');

    setSalao(data);
  }
  

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.get('saloes');
  
      if (error) {
        console.error('Erro ao buscar os salões:', error);
        return;
      }
  
      const saloes = data.map((salao) => ({
        uid: salao.id,
        nome: salao.nome,
        email: salao.email,
        descricao: salao.descricao,
        cnpj: salao.cnpj,
        endereco: salao.endereco,
        cidade: salao.cidade,
        capacidade: salao.capacidade,
        logo: salao.logo,
        imagens: salao.imagens,
      }));
  
      setSalao(salao);
    } catch (error) {
      console.error('Erro ao buscar os salões:', error);
    }
  };

  return (
    <SalaoContext.Provider value={{salao, getHallData}}>
      {children}
    </SalaoContext.Provider>
  );
};
