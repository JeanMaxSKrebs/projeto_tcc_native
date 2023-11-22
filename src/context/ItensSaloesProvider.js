import React, { createContext, useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import supabase from '../services/supabase';
// import supabase from '../services/supabaseClient';
import { supabase } from '../../supabase/supabase';

import { AuthUserContext } from './AuthUserProvider';
import { SalaoContext } from './SalaoProvider';

import RNFetchBlob from 'rn-fetch-blob';

import { decode } from 'base64-arraybuffer'

export const ItensSaloesContext = createContext({});

export const ItensSaloesProvider = ({ children }) => {
  const [itensSaloes, setItensSaloes] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getItensSaloes = async (salaoId, idsNegados) => {
    try {
      // console.log('salaoId')
      // console.log(salaoId)
      // console.log('idsNegados')
      // console.log(idsNegados)
      let dados = [];
      if (idsNegados) {
        const { data, error } = await supabase
          .from('itens_saloes')
          .select(`*,
              itens ( nome, descricao, imagem )`)
          .eq('salao_id', salaoId)
          .eq('status', 'ativo') // filtrar registros ativos
          .order('id', { ascending: true })
          .not('id', 'in', idsNegados);

        if (error) {
          console.error('Erro ao buscar os itens:', error);
          return;
        }

        dados = data;

      } else {
        const { data, error } = await supabase
          .from('itens_saloes')
          .select(`*,
              itens ( nome, descricao, imagem )`)
          .eq('salao_id', salaoId)
          .eq('status', 'ativo') // filtrar registros ativos
          .order('id', { ascending: true });

        if (error) {
          console.error('Erro ao buscar os itens:', error);
          return;
        }

        dados = data;

      }
      // console.log('dados.length')
      // console.log(dados.length)

      const fetchedItens = dados.map(dado => ({
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
    console.log('ItemItensSaloesData');
    console.log(ItemItensSaloesData);

    try {
      console.log('ItemItensSaloesData.imagens');
      console.log(ItemItensSaloesData.imagens);

      const pastaDesejada = `${ItemItensSaloesData.salaoId}_${ItemItensSaloesData.nomeSalao}`;

      console.log('pastaDesejada');
      console.log(pastaDesejada);
      const novoNomeSemCaracteresIndesejados = (
        ItemItensSaloesData.novoNome
          ? ItemItensSaloesData.novoNome.replace(/[^\w\s]/gi, '')
          : ItemItensSaloesData.itens.nome.replace(/[^\w\s]/gi, '')
      );
      const nomeArquivo = `${novoNomeSemCaracteresIndesejados}`;
      console.log('nomeArquivo');
      console.log(nomeArquivo);

      // Lê o conteúdo do arquivo
      const conteudoBlob = await RNFetchBlob.fs.readFile(ItemItensSaloesData.novaImagem, 'base64');

      // console.log('conteudoBlob');
      // console.log(conteudoBlob);

      const { data: UploadResponse, error: logoUploadError } = await supabase
        .storage
        .from('perfil') //nome do bucket
        .upload(`${pastaDesejada}/itens/${nomeArquivo}`, decode(conteudoBlob), {
          cacheControl: '3600', // configurações de cache
          contentType: 'image/png'
        },);

      if (logoUploadError) {
        console.error('Erro ao fazer upload da logo:', logoUploadError);
        return;
      }
      console.log('UploadResponse');
      console.log(UploadResponse);
      // Após o upload da logo, obtenha a URL do arquivo no armazenamento

      const baseUrl = 'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/public/perfil/';
      const imgURL = baseUrl + UploadResponse.path;
      console.log('imgURL');
      console.log(imgURL);
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
            nova_imagem: imgURL,
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
    console.log(ItemItensSaloesData);
    // console.log('ItemItensSaloesData.novaImagem');
    // console.log(ItemItensSaloesData.novaImagem);
    // console.log('ItemItensSaloesData.imagens');
    // console.log(ItemItensSaloesData.imagens);

    const pastaDesejada = `${ItemItensSaloesData.salaoId}_${ItemItensSaloesData.nomeSalao}`;

    console.log('pastaDesejada');
    console.log(pastaDesejada);
    const novoNomeSemCaracteresIndesejados = (
      ItemItensSaloesData.novoNome
        ? ItemItensSaloesData.novoNome.replace(/[^\w\s]/gi, '')
        : ItemItensSaloesData.itens.nome.replace(/[^\w\s]/gi, '')
    );
    const nomeArquivo = `${novoNomeSemCaracteresIndesejados}`;
    console.log('nomeArquivo');
    console.log(nomeArquivo);

    // Lê o conteúdo do arquivo
    const conteudoBlob = await RNFetchBlob.fs.readFile(ItemItensSaloesData.novaImagem, 'base64');

    // console.log('conteudoBlob');
    // console.log(conteudoBlob);


    const { data: ExcludeResponse, error: imgDeleteError } = await supabase
      .storage
      .from('perfil')
      .remove([`${pastaDesejada}/itens/${nomeArquivo}`])

    if (imgDeleteError) {
      console.error('Erro ao fazer delete da imagem:', imgDeleteError);
      return;
    }
    const { data: UploadResponse, error: imgUploadError } = await supabase
      .storage
      .from('perfil') //nome do bucket
      .upload(`${pastaDesejada}/itens/${nomeArquivo}`, decode(conteudoBlob), {
        cacheControl: '3600', // configurações de cache
        contentType: 'image/png'
      },);

    if (imgUploadError) {
      console.error('Erro ao fazer upload da imagem:', imgUploadError);
      return;
    }
    console.log('UploadResponse');
    console.log(UploadResponse);
    // Após o upload da logo, obtenha a URL do arquivo no armazenamento

    const baseUrl = 'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/public/perfil/';
    const imgURL = baseUrl + UploadResponse.path;
    console.log('imgURL');
    console.log(imgURL);

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
          nova_imagem: imgURL,
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