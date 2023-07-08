import React, {createContext, useEffect, useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native' 
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import supabase from '../services/supabase';
// import supabase from '../services/supabaseClient';
import { supabase  } from "../../supabase/supabase";


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

  const saveSalao = async (salaoData) => {
    console.log('salaoData');
    console.log(salaoData);
    
    try {
      const { data: insertedData, error: insertError } = await supabase
      .from('saloes')
      .insert([
        {
          nome: salaoData.nome,
          email: salaoData.email,
          descricao: salaoData.descricao,
          cnpj: salaoData.cnpj,
          endereco: salaoData.endereco,
          cidade: salaoData.cidade,
          capacidade: salaoData.capacidade,
          // logo: salaoData.logo,
          // imagens: salaoData.imagens,
          
          //logo e imagens estaticas
          logo: 'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/imagens%20saloes/salao%20c.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZW5zIHNhbG9lcy9zYWxhbyBjLmpwZWciLCJpYXQiOjE2ODc5OTg1MjgsImV4cCI6MTcxOTUzNDUyOH0.iJ9sEu3ZVZKffB294lldjTv-cyOZjlfn_sFQUqcI31Q&t=2023-06-29T00%3A28%3A48.663Z',
          imagens: [
            "https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/imagens%20saloes/salao%20a.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZW5zIHNhbG9lcy9zYWxhbyBhLmpwZWciLCJpYXQiOjE2ODc5OTgzOTksImV4cCI6MTcxOTUzNDM5OX0.WI1WLP0lK-y3_8Hbc--JoHCUaJ8CASA5pUnV24kvO4o&t=2023-06-29T00%3A26%3A39.877Z",
            "https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/imagens%20saloes/salao%20b.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZW5zIHNhbG9lcy9zYWxhbyBiLmpwZWciLCJpYXQiOjE2ODc5OTg0NDEsImV4cCI6MTcxOTUzNDQ0MX0.-bBq524qvk8b_D9BkqpcCoDCQM_jEh_xwhN0yDvxWjY&t=2023-06-29T00%3A27%3A21.406Z"
          ]
        }
        
      ])

      console.log('data')
      console.log(insertedData)
              
      if (insertError) {
        console.error('Erro ao inserir os salões:', insertError);
        return;
      }
      console.log('Salões inseridos com sucesso:', insertedData);
  
      // setSalao((prevSaloes) => [...prevSaloes, data[0]]);
  
      showToast('Salão salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o salão:', error);
    }
  };
  

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
    <SalaoContext.Provider value={{salao, saveSalao, getHallData}}>
      {children}
    </SalaoContext.Provider>
  );
};
