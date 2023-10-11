import React, {createContext, useEffect, useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native' 
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import supabase from '../services/supabase';
// import supabase from '../services/supabaseClient';
import { supabase  } from "../../supabase/supabase";


import {AuthUserContext} from './AuthUserProvider';

export const ClienteContext = createContext({});

export const ClienteProvider = ({children}) => {
  const [cliente, setCliente] = useState();
  const {user, getUser, signOut} = useContext(AuthUserContext);

  const getClientData = async (email) => {
    try {
      const { data, error } = await supabase.from('clientes').select('*').eq('email', email);
      if (error) {
        console.error('An error occurred while fetching client data:', error);
        // Handle the error appropriately
      } else {
        // console.log('data cliete');
        // console.log(data);
        setCliente(data[0]);
      }
    } catch (error) {
      console.error('An error occurred while fetching client data:', error);
      // Handle the error appropriately
    }
  };


  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };


  const saveCliente = async (clienteData) => {
    console.log('clienteData');
    console.log(clienteData);
    
    try {
      const { data: insertedData, error: insertError } = await supabase
      .from('clientes')
      .insert([
        {
          nome: clienteData.nome,
          email: clienteData.email,
          cpf: clienteData.cpf,
          telefone: clienteData.telefone,
        //   idade: clienteData.idade,
        //   foto_perfil: clienteData.foto_perfil,

        // foto de perfil estatica
        foto_perfil: 'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/public/perfil/icone%20amarelo.png?t=2023-07-09T00%3A26%3A11.547Z',
        }
        
      ])

      console.log('data')
      console.log(insertedData)
              
      if (insertError) {
        console.error('Erro ao inserir os clientes:', insertError);
        return;
      }
      console.log('clientes inseridos com sucesso:', insertedData);
  
      // setSalao((prevClientes) => [...prevClientes, data[0]]);
  
      showToast('Cliente salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o Cliente:', error);
    }
  };
  

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.get('clientes');
  
      if (error) {
        console.error('Erro ao buscar os clientes:', error);
        return;
      }
  
      const clientes = data.map((cliente) => ({
        uid: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        cpf: cliente.cpf,
        idade: cliente.idade,
        telefone: cliente.telefone,
        foto_perfil: cliente.foto_perfil,
        
          
      }));
  
      setCliente(cliente);
    } catch (error) {
      console.error('Erro ao buscar os clientes:', error);
    }
  };

  return (
    <ClienteContext.Provider value={{cliente, saveCliente, getClientData}}>
      {children}
    </ClienteContext.Provider>
  );
};
