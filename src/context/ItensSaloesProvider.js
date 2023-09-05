import React, { createContext, useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import supabase from '../services/supabase';
// import supabase from '../services/supabaseClient';
import { supabase } from '../../supabase/supabase';

import { AuthUserContext } from './AuthUserProvider';

export const ItensSaloesContext = createContext({});

export const ItensSaloesProvider = ({ children }) => {
  const [itensSaloes, setItensSaloes] = useState([]);
  const { user, getUser, signOut } = useContext(AuthUserContext);
  const [salao, setSalao] = useState([]);

  useEffect(() => {
    if (user !== null) {
      // console.log(user)
      // console.log('user salao')
      getItensSaloes(salao.id);
    } else {
      // console.log(user)
      // console.log('user aaaaa')
      getUser();
    }
  }, []);

  const getItensSaloes = async salaoId => {
    try {
      // console.log(salaoId)

      const { data, error } = await supabase
      .from('itens_saloes')
      .select(`
        *,
        itens ( nome, descricao, imagem )
      `)
      .eq('salao_id', salaoId);
    


      // const { data, error } = await supabase
      //   .from('itens_saloes')
      //   .select('*')
      //   .eq('salao_id', salaoId);

      if (error) {
        console.error('Erro ao buscar os itens:', error);
        return;
      }
      console.log('data[0]');
      console.log(data[0]);
      // console.log(data.length)

      const fetchedItens = data.map(dado => ({
        id: dado.id,
        salaoId: dado.salao_id,
        itemId: dado.item_id,
        valorUnitario: dado.valor_unitario,
        quantidadeMaxima: dado.quantidade,
        nome: dado.itens.nome,
        descricao: dado.itens.descricao,
        imagem: dado.itens.imagem,
        novoNome: dado.itens.novo_nome,
        novaDescricao: dado.itens.nova_descricao,
        novaImagem: dado.itens.nova_imagem,
      }));
      // console.log('fetchedItens');
      // console.log(fetchedItens);





      setItensSaloes(fetchedItens);

      return fetchedItens;
    } catch (error) {
      console.error('Erro ao buscar os itens:', error);
    }
  };

  const updateItensSaloes = async salaoData => {
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
  return (
    <ItensSaloesContext.Provider value={{ itensSaloes, getItensSaloes, updateItensSaloes }}>
      {children}
    </ItensSaloesContext.Provider>
  );
}