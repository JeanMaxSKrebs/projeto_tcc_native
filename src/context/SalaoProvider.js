import React, { createContext, useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import supabase from '../services/supabase';
// import supabase from '../services/supabaseClient';
import { supabase } from '../../supabase/supabase';

import { AuthUserContext } from './AuthUserProvider';

export const SalaoContext = createContext({});

export const SalaoProvider = ({ children }) => {
  const [salao, setSalao] = useState([]);
  const [reservas, setReservas] = useState([]);
  const { user, getUser, signOut } = useContext(AuthUserContext);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getHallData = async () => {
    // console.log(user);
    // console.log('max aqui');
    try {
      const { data: salao, error } = await supabase
        .from('saloes')
        .select('*')
        .eq('email', user.email);

      // console.log('salaoopcao')
      // console.log(salao)
      // console.log(salao[0])
      setSalao(salao[0]);
    } catch (error) {
      console.error('Erro ao buscar o salão:', error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      // console.log(user)
      // console.log('user salao')
      getHallData();
    } else {
      // console.log(user)
      // console.log('user aaaaa')
      getUser();
    }
  }, []);

  const saveSalao = async salaoData => {
    // console.log('salaoData');
    // console.log(salaoData);

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
            // capacidade: salaoData.capacidade,
            // logo: salaoData.logo,
            // imagens: salaoData.imagens,

            //logo e imagens e capacidade estaticas
            capacidade: 100,
            logo: 'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/imagens%20saloes/salao%20c.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZW5zIHNhbG9lcy9zYWxhbyBjLmpwZWciLCJpYXQiOjE2ODc5OTg1MjgsImV4cCI6MTcxOTUzNDUyOH0.iJ9sEu3ZVZKffB294lldjTv-cyOZjlfn_sFQUqcI31Q&t=2023-06-29T00%3A28%3A48.663Z',
            imagens: [
              'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/imagens%20saloes/salao%20a.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZW5zIHNhbG9lcy9zYWxhbyBhLmpwZWciLCJpYXQiOjE2ODc5OTgzOTksImV4cCI6MTcxOTUzNDM5OX0.WI1WLP0lK-y3_8Hbc--JoHCUaJ8CASA5pUnV24kvO4o&t=2023-06-29T00%3A26%3A39.877Z',
              'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/imagens%20saloes/salao%20b.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZW5zIHNhbG9lcy9zYWxhbyBiLmpwZWciLCJpYXQiOjE2ODc5OTg0NDEsImV4cCI6MTcxOTUzNDQ0MX0.-bBq524qvk8b_D9BkqpcCoDCQM_jEh_xwhN0yDvxWjY&t=2023-06-29T00%3A27%3A21.406Z',
            ],
          },
        ])
        .select()

      // console.log('data')
      // console.log(insertedData)

      if (insertError) {
        console.error('Erro ao inserir o salão:', insertError);
        return;
      }
      // console.log('Salões inseridos com sucesso:', insertedData);


      const { data: itemsData, error: itemsError } = await supabase
        .from('itens')
        .select('id');

      if (itemsError) {
        console.error('Erro ao pegar itens do salão:', itemsError);
        return;
      }
      // console.log('itens inseridos com sucesso:', itemsData);

      console.log('itensdata')
      console.log(itemsData)

      // console.log('insertedData[0].id')
      // console.log(insertedData[0].id)
      const newSalaoId = insertedData[0].id;

      const { error: updateError } = await Promise.all(
        itemsData.map(async item => {
          const { data, error } = await supabase
            .from('itens_saloes')
            .insert([
              { salao_id: newSalaoId, item_id: item.id },
            ])

          if (error) {
            // Lidar com o erro, se necessário
            console.log('error')
            console.log(error)
          }
          console.log(data)
          return data;
        })
      );

      if (updateError) {
        console.error('Erro ao atualizar os itens do salão:', updateError);
        return;
      }

      // setSalao((prevSaloes) => [...prevSaloes, data[0]]);

      showToast('Salão salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o salão:', error);
    }
  };

  const updateSalao = async salaoData => {
    // console.log('salaoData');
    // console.log(salaoData);

    try {
      const { data: updatedData, error: updateError } = await supabase
        .from('saloes')
        .update({
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
            'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/imagens%20saloes/salao%20a.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZW5zIHNhbG9lcy9zYWxhbyBhLmpwZWciLCJpYXQiOjE2ODc5OTgzOTksImV4cCI6MTcxOTUzNDM5OX0.WI1WLP0lK-y3_8Hbc--JoHCUaJ8CASA5pUnV24kvO4o&t=2023-06-29T00%3A26%3A39.877Z',
            'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/imagens%20saloes/salao%20b.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZW5zIHNhbG9lcy9zYWxhbyBiLmpwZWciLCJpYXQiOjE2ODc5OTg0NDEsImV4cCI6MTcxOTUzNDQ0MX0.-bBq524qvk8b_D9BkqpcCoDCQM_jEh_xwhN0yDvxWjY&t=2023-06-29T00%3A27%3A21.406Z',
          ],
        })
        .match({ id: salaoData.id });

      // console.log('data');
      // console.log(updatedData);
      getHallData();
      if (updateError) {
        console.error('Erro ao atualizar o salão:', updateError);
        return;
      }
      console.log('Salão atualizado com sucesso:', updatedData);

      showToast('Salão atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o salão:', error);
    }
  };

  const getReservasPorSalao = async (id) => {
    try {
      console.log('id');
      console.log(id);
        const { data, error } = await supabase
          .from('reservas')
          .select('*')
          .eq('salao_id', id);

        if (error) {
          console.error('Erro ao buscar reservas:', error);
          return;
        }

        // setReservas(data);

        const reservasOrdenadas = data.sort((a, b) => {
          const dataHoraA = new Date(a.data_hora).getTime();
          const dataHoraB = new Date(b.data_hora).getTime();
          return dataHoraA - dataHoraB;
        });
    
        setReservas(reservasOrdenadas);
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
    }
  };

  const createReserva = async (data) => {
    try {
      // Realize a lógica para criar uma reserva aqui.
      // Use os dados passados para criar a reserva no banco de dados.

      showToast('Reserva criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
    }
  };

  return (
    <SalaoContext.Provider value={{ salao, saveSalao, updateSalao, getHallData,
      reservas, createReserva, getReservasPorSalao}}>
      {children}
    </SalaoContext.Provider>
  );
};
