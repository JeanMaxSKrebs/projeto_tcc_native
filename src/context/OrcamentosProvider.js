import React, {createContext, useEffect, useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';
// import supabase from '../services/supabase';
// import supabase from '../services/supabaseClient';
import {supabase} from '../../supabase/supabase';

import {AuthUserContext} from './AuthUserProvider';

export const OrcamentosContext = createContext({});

export const OrcamentosProvider = ({children}) => {
  const [orcamentos, setOrcamentos] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getBudgetData = async id => {
    try {
      const {data, error} = await supabase
        .from('orcamentos')
        .select('*')
        .eq('salao_id', id);

      if (error) {
        console.error('Erro ao buscar os orçamentos:', error);
        return;
      }
      const orcamentos = data.map(orcamento => ({
        id: orcamento.id,
        nome: orcamento.nome,
        descricao: orcamento.descricao,
        valorBase: orcamento.valor_base,
        valorTotal: orcamento.valor_total,
      }));

      // console.log('orcamentosopcao')
      // console.log(orcamentos)
      setOrcamentos(orcamentos);
    } catch (error) {
      console.error('Erro ao buscar os orçamentos:', error);
    }
  };

  // useEffect(() => {
  //   if (user !== null) {
  //     console.log(user)
  //     console.log(user.id)
  //     getBudgetData(user.id);
  //   } else {
  //     getUser();
  //   }
  // }, []);

  const saveOrcamento = async (orcamentoData, itensData) => {
    try {
      console.log('orcamentoData');
      console.log(orcamentoData);
      // console.log(itensData);
      // Primeiro, insira o orçamento na tabela 'orcamentos'
      const {data: orcamento, error: orcamentoError} = await supabase
        .from('orcamentos')
        .insert([
          {
            salao_id: orcamentoData.salao_id,
            nome: orcamentoData.nome,
            descricao: orcamentoData.descricao,
            valor_base: orcamentoData.valorBase,
            valor_itens: 0, // O valor total será calculado posteriormente
            valor_total: orcamentoData.valorTotal,
          },
        ])
        .select('id');

      if (orcamentoError) {
        throw orcamentoError;
      }
      console.log('itensData')
      console.log(itensData)
      if (itensData) {
        // Agora, insira os itens de orçamento na tabela 'itens_orcamentos'
        const itensToInsert = itensData.map(item => ({
          orcamento_id: orcamento[0].id, // Assume que a primeira inserção do orçamento é bem-sucedida
          nome: item.nome,
          valor_unitario: item.valor_unitario,
          quantidade: item.quantidade,
        }));

        const {data: itens, error: itensError} = await supabase
          .from('itens_orcamentos')
          .insert(itensToInsert);

        if (itensError) {
          throw itensError;
        }

        // Atualize o valor total do orçamento com base nos itens
        const totalValue = itens.reduce(
          (total, item) => total + item.valor_unitario * item.quantidade,
          0,
        );

        const {data: updatedOrcamento, error: updateError} = await supabase
          .from('orcamentos')
          .update({valor_total: totalValue})
          .match({id: orcamento[0].id});

        if (updateError) {
          throw updateError;
        }

        return {orcamento: updatedOrcamento[0], itens};
      }

      // console.log('orcamento');
      // console.log(orcamento[0]);
      // console.log(orcamento[0].id);
  
      return orcamento[0].id;
    } catch (error) {
      console.error('Erro ao salvar orçamento:', error);
      return {error: 'Erro ao salvar orçamento.'};
    }
  };

  const updateOrcamento = async (
    orcamentoId,
    orcamentoData,
    novosItensData,
  ) => {
    try {
      // Atualize os dados do orçamento na tabela 'orcamentos'
      const {data: updatedOrcamento, error: updateError} = await supabase
        .from('orcamentos')
        .update({
          salao_id: orcamentoData.salaoId,
          nome: orcamentoData.nome,
          descricao: orcamentoData.descricao,
          valor_base: orcamentoData.valorBase,
        })
        .match({id: orcamentoId});

      if (updateError) {
        throw updateError;
      }
      if (novosItensData) {

      // Atualize os itens de orçamento
      // Primeiro, delete os itens antigos
      const {data: deleteResult, error: deleteError} = await supabase
        .from('itens_orcamentos')
        .delete()
        .match({orcamento_id: orcamentoId});

      if (deleteError) {
        throw deleteError;
      }

      // Agora, insira os novos itens
      const itensToInsert = novosItensData.map(item => ({
        orcamento_id: orcamentoId,
        nome: item.nome,
        valor_unitario: item.valor_unitario,
        quantidade: item.quantidade,
      }));

      const {data: novosItens, error: insertError} = await supabase
        .from('itens_orcamentos')
        .insert(itensToInsert);

      if (insertError) {
        throw insertError;
      }

      // Atualize o valor total do orçamento com base nos novos itens
      const totalValue = novosItens.reduce(
        (total, item) => total + item.valor_unitario * item.quantidade,
        0,
      );

      const {data: updatedOrcamentoTotal, error: updateTotalError} =
        await supabase
          .from('orcamentos')
          .update({valor_total: totalValue})
          .match({id: orcamentoId});

      if (updateTotalError) {
        throw updateTotalError;
      }

      return {orcamento: updatedOrcamento, novosItens};
    }

    return true;

    } catch (error) {
      console.error('Erro ao atualizar orçamento:', error);
      return {error: 'Erro ao atualizar orçamento.'};
    }
  };

  return (
    <OrcamentosContext.Provider
      value={{orcamentos, getBudgetData, saveOrcamento, updateOrcamento}}>
      {children}
    </OrcamentosContext.Provider>
  );
};
