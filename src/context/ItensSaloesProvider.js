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
      // console.log('salaoId')
      // console.log(salaoId)

      const { data, error } = await supabase
        .from('itens_saloes')
        .select(`
        *,
        itens ( nome, descricao, imagem )
      `)
        .eq('salao_id', salaoId)
        .eq('status', 'ativo') // filtrar registros ativos
        .order('id', { ascending: true })


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
        item_id: dado.item_id,
        itens: {
          descricao: dado.itens ? dado.itens.descricao : null,
          imagem: dado.itens ? dado.itens.imagem : 'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/itens/item_default.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpdGVucy9pdGVtX2RlZmF1bHQucG5nIiwiaWF0IjoxNjkzNDU4OTM2LCJleHAiOjE3MjQ5OTQ5MzZ9.55QFlK88bSQ-4OaddGVewX096E0I_dqC2LEmyJXtnuw&t=2023-08-31T05%3A15%3A36.704Z',
          //imagem padrao caso nao tenha
          nome: dado.itens ? dado.itens.nome : null,
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

  const insertItemItensSaloes = async ItemItensSaloesData => {
    // console.log('ItemItensSaloesData');
    // console.log(ItemItensSaloesData);

    try {
      const { error: insertError } = await supabase
        .from('itens_saloes')
        .insert([
          {
            salao_id: ItemItensSaloesData.salaoId,
            item_id: ItemItensSaloesData.itemId,
            valor_unitario: ItemItensSaloesData.valorUnitario,
            status: 'ativo',
            quantidade_maxima: ItemItensSaloesData.quantidadeMaxima,
            novo_nome: ItemItensSaloesData.novoNome,
            nova_descricao: ItemItensSaloesData.novaDescricao,
            nova_imagem: ItemItensSaloesData.novaImagem,
          }
        ]);

      if (insertError) {
        console.error('Erro ao inserir o Item do Salão:', insertError);
        return;
      }

      showToast('Item do Salão inserido com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao salvar o Item do Salão:', error);
    }
  };

  const updateItemItensSaloes = async ItemItensSaloesData => {
    // console.log('ItemItensSaloesData');
    // console.log(ItemItensSaloesData);

    try {
      const { error: updateError } = await supabase
        .from('itens_saloes')
        .update({
          salao_id: ItemItensSaloesData.salaoId,
          item_id: ItemItensSaloesData.itemId,
          valor_unitario: ItemItensSaloesData.valorUnitario,
          quantidade_maxima: ItemItensSaloesData.quantidadeMaxima,
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

  const softDeleteItemSalao = async (id) => {
    try {
      const { error } = await supabase
        .from('itens_saloes')
        .update({ status: 'inativo' }) // Marca o registro como inativo
        .eq('id', id);

      if (!error) {
        console.log(`Registro com ID ${id} marcado como inativo (soft delete).`);
      } else {
        console.error('Erro ao realizar soft delete:', error);
      }
    } catch (error) {
      console.error('Erro ao realizar soft delete:', error);
    }
  };

  const hardDeleteItemSalao = async (id) => {
    try {
      const { error } = await supabase
        .from('itens_saloes')
        .delete() // Exclui permanentemente o registro
        .eq('id', id);

      if (!error) {
        console.log(`Registro com ID ${id} excluído permanentemente (hard delete).`);
      } else {
        console.error('Erro ao realizar hard delete:', error);
      }
    } catch (error) {
      console.error('Erro ao realizar hard delete:', error);
    }
  };

  return (
    <ItensSaloesContext.Provider value={{
      itensSaloes, setItensSaloes, getItensSaloes,
      insertItemItensSaloes, updateItemItensSaloes,
      softDeleteItemSalao, hardDeleteItemSalao
    }}>
      {children}
    </ItensSaloesContext.Provider>
  );
}