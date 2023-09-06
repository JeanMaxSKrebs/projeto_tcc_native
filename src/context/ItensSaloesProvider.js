import React, { createContext, useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import supabase from '../services/supabase';
// import supabase from '../services/supabaseClient';
import { supabase } from '../../supabase/supabase';

import { AuthUserContext } from './AuthUserProvider';
import { SalaoContext } from './SalaoProvider';

export const ItensSaloesContext = createContext({});

export const ItensSaloesProvider = ({ children }) => {
  const [itensSaloes, setItensSaloes] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getItensSaloes = async salaoId => {
    try {
      // console.log(salaoId)

      const { data, error } = await supabase
        .from('itens_saloes')
        .select(`
        *,
        itens ( nome, descricao, imagem )
      `)
        .eq('salao_id', salaoId)
        .order('id', { ascending: true })

      // const { data, error } = await supabase
      //   .from('itens_saloes')
      //   .select('*')
      //   .eq('salao_id', salaoId);

      if (error) {
        console.error('Erro ao buscar os itens:', error);
        return;
      }
      // console.log('data[0]');
      // console.log(data[0]);
      // console.log(data.length)

      const fetchedItens = data.map(dado => ({
          created_at: dado.created_at,
          id: dado.id,
          item_id: dado.itemId,
          itens: {
            descricao: dado.itens.descricao,
            imagem: dado.itens.imagem,
            nome: dado.itens.nome,
          },
          novaDescricao: dado.nova_descricao,
          novaImagem: dado.nova_imagem,
          novoNome: dado.novo_nome,
          quantidadeMaxima: dado.quantidade_maxima,
          salaoId: dado.salao_id,
          valorUnitario: dado.valor_unitario,
      }));
      // console.log('fetchedItens[0]');
      // console.log(fetchedItens[0]);

      setItensSaloes(fetchedItens);

      return fetchedItens;
    } catch (error) {
      console.error('Erro ao buscar os itens do salão:', error);
    }
  };

  const updateItemItensSaloes = async ItemItensSaloesData => {
    console.log('ItemItensSaloesData');
    console.log(ItemItensSaloesData);

    try {
      const { error: updateError } = await supabase
        .from('itens_saloes')
        .update({
          salao_id: ItemItensSaloesData.salaoId,
          item_id: ItemItensSaloesData.itemId,
          valor_unitario: ItemItensSaloesData.valorUitario,
          quantidadeMaxima: ItemItensSaloesData.quantidade_maxima,
          novo_nome: ItemItensSaloesData.novoNome,
          nova_descricao: ItemItensSaloesData.novaDescricao,
          nova_imagem: ItemItensSaloesData.novaImagem,
        },)
        .match({ id: ItemItensSaloesData.id });

      if (updateError) {
        console.error('Erro ao atualizar o Item do Salão:', updateError);
        return;
      }

      showToast('Item do Salão atualizado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao salvar o Item do Salão:', error);
    }
  };
  return (
    <ItensSaloesContext.Provider value={{ itensSaloes, getItensSaloes, updateItemItensSaloes }}>
      {children}
    </ItensSaloesContext.Provider>
  );
}