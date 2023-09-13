import React, { createContext, useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import supabase from '../services/supabase';
// import supabase from '../services/supabaseClient';
import { supabase } from '../../supabase/supabase';

import { AuthUserContext } from './AuthUserProvider';

export const ItensOrcamentosContext = createContext({});

export const ItensOrcamentosProvider = ({ children }) => {
    const [itensOrcamento, setItensOrcamento] = useState([]);
    const [itensOrcamentos, setItensOrcamentos] = useState([]);
    let itensSaloesIds = [];

    const showToast = message => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const getItensOrcamentoById = async (orcamentoId) => {
        try {
            const { data: dataItensOrcamentos, error } = await supabase
                .from('itens_orcamentos')
                .select(`
              *,
              itens_saloes(*)
            `)
                .eq('orcamento_id', orcamentoId)
                .order('id', { ascending: true });

            if (error) {
                console.error('Erro ao buscar os itens do orcamento:(123)', error);
                return null;
            }

            const fetchedItens = dataItensOrcamentos.map((dado) => ({
                id: dado.id,
                orcamentoId: dado.orcamento_id,
                itensSaloesId: dado.itens_saloes_id,
                novoValorUnitario: dado.novo_valor_unitario,
                valorTotal: dado.valor_total,
                quantidade: dado.quantidade,
                novaDescricao: dado.itens_saloes.nova_descricao,
                novaImagem: dado.itens_saloes.nova_imagem,
                novoNome: dado.itens_saloes.novo_nome,
                quantidadeMaxima: dado.itens_saloes.quantidade_maxima,
                valorUnitario: dado.itens_saloes.valor_unitario,
            }));

            const itensSaloesIds = fetchedItens.map((item) => item.itensSaloesId);

            const promises = itensSaloesIds.map(async (id) => {
                const { data: itemSaloesData, error: itemSaloesError } = await supabase
                    .from('itens_saloes')
                    .select(`
                *,
                itens (nome, descricao, imagem)
              `)
                    .eq('id', id);

                if (itemSaloesError) {
                    console.error('Erro ao buscar item_saloes:', itemSaloesError);
                    return null;
                }

                return itemSaloesData[0];
            });

            const dataItensSaloes = await Promise.all(promises);

            const itensCompletos = dataItensSaloes.map((item) => {
                const resultado = fetchedItens.find((campos) => campos.itensSaloesId === item.id);

                // console.log('resultado');
                // console.log(resultado);
                if (resultado) {
                    const itens = {
                        nome: item.itens && item.itens.nome !== null ? item.itens.nome : null,
                        descricao: item.itens && item.itens.descricao !== null ? item.itens.descricao : null,
                        imagem: item.itens && item.itens.imagem !== null ? item.itens.imagem : 'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/itens/item_default.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpdGVucy9pdGVtX2RlZmF1bHQucG5nIiwiaWF0IjoxNjkzNDU4OTM2LCJleHAiOjE3MjQ5OTQ5MzZ9.55QFlK88bSQ-4OaddGVewX096E0I_dqC2LEmyJXtnuw&t=2023-08-31T05%3A15%3A36.704Z'
                    };
                    return {
                        ...resultado,
                        itens: itens,
                    };
                }
            });
            setItensOrcamento(itensCompletos)
            return itensCompletos;
        } catch (error) {
            console.error('Erro ao buscar os itens do orcamento:(456)', error);
            return null;
        }
    };

    const getItensOrcamentos = async orcamentoId => {
        try {
            // console.log(orcamentoId)

            const { data: dataItensOrcamentos, error } = await supabase
                .from('itens_orcamentos')
                .select(`
                    *,
                    itens_saloes(*)
                `)
                .eq('orcamento_id', orcamentoId)
                .order('id', { ascending: true })

            if (error) {
                console.error('Erro ao buscar os itens do orcamento(789):', error);
                return;
            }
            // console.log('dataItensOrcamentos');
            // console.log(dataItensOrcamentos);
            // console.log(dataItensOrcamentos.length)

            const fetchedItens = dataItensOrcamentos.map(dado => (
                itensSaloesIds.push(dado.itens_saloes_id),
                ({
                    id: dado.id,
                    orcamentoId: dado.orcamento_id,
                    itensSaloesId: dado.itens_saloes_id,
                    novoValorUnitario: dado.novo_valor_unitario, //+ (dado.itens_saloes.valor_unitario *  dado.itens_saloes.quantidade)
                    valorTotal: dado.valor_total, //+ (dado.itens_saloes.valor_unitario *  dado.itens_saloes.quantidade)
                    quantidade: dado.quantidade,
                    novaDescricao: dado.itens_saloes.nova_descricao,
                    novaImagem: dado.itens_saloes.nova_imagem,
                    novoNome: dado.itens_saloes.novo_nome,
                    quantidadeMaxima: dado.itens_saloes.quantidade_maxima,
                    valorUnitario: dado.itens_saloes.valor_unitario,
                })
            ));
            // console.log('fetchedItens');
            // console.log(fetchedItens);
            // console.log(fetchedItens[0]);

            // console.log('itensSaloesIds');
            // console.log(itensSaloesIds);
            const promises = itensSaloesIds.map(async (id) => {
                // console.log(id)
                const { data: itemSaloesData, error: itemSaloesError } = await supabase
                    .from('itens_saloes')
                    .select(`*,
                    itens (nome, descricao, imagem)
                    `)
                    .eq('id', id);

                if (itemSaloesError) {
                    console.error('Erro ao buscar item_saloes:', itemSaloesError);
                    return null;
                }

                return itemSaloesData[0];
            });

            const dataItensSaloes = await Promise.all(promises);

            // console.log('dataItensSaloes')
            // console.log(dataItensSaloes[0])

            // console.log('fetchedItens');
            // console.log(fetchedItens);

            // Relacionar os dados entre fetchedItens e dataItensSaloes
            const itensCompletos = dataItensSaloes.map((item) => {
                // console.log('item')
                // console.log(item)
                let resultado = fetchedItens.find((campos) => {
                    return campos.itensSaloesId === item.id
                })
                // console.log('resultado')
                // console.log(resultado)
                if (resultado) {
                    // console.log("encontrado");
                    const itens = {
                        nome: item.itens && item.itens.nome !== null ? item.itens.nome : null,
                        descricao: item.itens && item.itens.descricao !== null ? item.itens.descricao : null,
                        imagem: item.itens && item.itens.imagem !== null ? item.itens.imagem : 'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/itens/item_default.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpdGVucy9pdGVtX2RlZmF1bHQucG5nIiwiaWF0IjoxNjkzNDU4OTM2LCJleHAiOjE3MjQ5OTQ5MzZ9.55QFlK88bSQ-4OaddGVewX096E0I_dqC2LEmyJXtnuw&t=2023-08-31T05%3A15%3A36.704Z'
                    };
                    return {
                        ...resultado,
                        itens: itens,
                    };
                } else {
                    // console.log("não encontrado");
                }
            });

            // console.log('itensCompletos');
            // console.log(itensCompletos);

            setItensOrcamentos(itensCompletos);
            return itensCompletos;
        } catch (error) {
            console.error('Erro ao buscar os itens do orcamento:', error);
        }
    };

    const insertItemItensOrcamentos = async (ItemItensOrcamentosData, orcamento) => {
        console.log('ItemItensOrcamentosData');
        console.log(ItemItensOrcamentosData);
        // console.log('orcamento');
        // console.log(orcamento);
        const valorUnitario = ItemItensOrcamentosData.novoValorUnitario || ItemItensOrcamentosData.valorUnitario;
        const quantidade = ItemItensOrcamentosData.quantidade || 0;
        
        const valorTotalItem = parseFloat(quantidade) * parseFloat(valorUnitario);
        let valorItens = orcamento.valorItens + parseFloat(valorTotalItem)
        try {
            const { error } = await supabase
                .from('itens_orcamentos')
                .insert([
                    {
                        orcamento_id: orcamento.id,
                        itens_saloes_id: ItemItensOrcamentosData.id,
                        quantidade: ItemItensOrcamentosData.quantidade,
                        novo_valor_unitario: ItemItensOrcamentosData.novo,
                        valor_total: valorTotalItem,
                    }
                ]);

            if (error) {
                console.error('Erro ao inserir o Item do orcamento:', error);
                return;
            }

            const { data, errorOrcamento } = await supabase
                .from('orcamentos')
                .update({
                    valor_itens: valorItens,
                    valor_total: orcamento.valorBase + valorItens,
                })
                .eq('id', orcamento.id)
                .select('*')

            // console.log('data');
            // console.log(data);

            if (errorOrcamento) {
                console.error('Erro ao inserir valores do orcamento:', errorOrcamento);
                return;
            }


            showToast('Item do orcamento inserido com sucesso!');

            const formattedData = data.map(item => ({
                ...item,
                valorBase: item.valor_base,
                valorItens: item.valor_itens,
                valorTotal: item.valor_total,
            }));


            // console.log('formattedData');
            // console.log(formattedData);


            return formattedData[0];
            return true;
        } catch (error) {
            console.error('Erro ao inserir o Item do orcamento: (123)', error);
        }
    };


    const updateItemItensOrcamentos = async ItemItensOrcamentosData => {
        // console.log('ItemItensOrcamentosData');
        // console.log(ItemItensOrcamentosData);

        try {
            const { error: updateError } = await supabase
                .from('itens_orcamentos')
                .update({
                    orcamento_id: ItemItensOrcamentosData.orcamentoId,
                    item_id: ItemItensOrcamentosData.itemId,
                    valor_unitario: ItemItensOrcamentosData.valorUitario,
                    quantidade: ItemItensOrcamentosData.quantidade,
                },)
                .match({ id: ItemItensOrcamentosData.id });

            if (updateError) {
                console.error('Erro ao atualizar o Item do orcamento:', updateError);
                return;
            }


            const { error: updateitensSaloesError } = await supabase
                .from('itens_saloes')
                .update({
                    novo_nome: ItemItensOrcamentosData.novoNome,
                    nova_descricao: ItemItensOrcamentosData.novaDescricao,
                    nova_imagem: ItemItensOrcamentosData.novaImagem,
                },)
                .match({ id: ItemItensOrcamentosData.id });

            if (updateitensSaloesError) {
                console.error('Erro ao atualizar o Itens do item do orcamento:', updateitensSaloesError);
                return;
            }

            showToast('Item do orcamento atualizado com sucesso!');
            return true;
        } catch (error) {
            console.error('Erro ao salvar o Item do orcamento:', error);
        }
    };
    return (
        <ItensOrcamentosContext.Provider value={{
            itensOrcamento, setItensOrcamento,
            itensOrcamentos, setItensOrcamentos, getItensOrcamentos,
            getItensOrcamentoById,
            insertItemItensOrcamentos, updateItemItensOrcamentos
        }}>
            {children}
        </ItensOrcamentosContext.Provider>
    );
}