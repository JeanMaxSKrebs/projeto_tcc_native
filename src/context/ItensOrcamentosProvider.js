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
    const [itensOrcamentos, setItensOrcamentos] = useState([]);
    let itensSaloesIds = [];

    const showToast = message => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
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
                console.error('Erro ao buscar os itens do orcamento:', error);
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

                    return {
                        ...resultado,
                        itens: {
                            nome: item.itens.nome,
                            descricao: item.itens.descricao,
                            imagem: item.itens.imagem,
                        },
                        // novaDescricao: resultado.novaDescricao,
                        // novaImagem: resultado.novaImagem,
                        // novoNome: resultado.novoNome,
                        // quantidadeMaxima: resultado.quantidadeMaxima,
                        // quantidade: resultado.quantidade,
                        // valorTotal: resultado.valorTotal,
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
        // console.log('ItemItensOrcamentosData');
        // console.log(ItemItensOrcamentosData);
        // console.log('orcamento');
        // console.log(orcamento);
        let valorTotalItem = ItemItensOrcamentosData.quantidade * ItemItensOrcamentosData.valorUnitario;
        let valorItens = orcamento.valorItens + valorTotalItem
        try {
            const { error } = await supabase
                .from('itens_orcamentos')
                .insert([
                    {
                        orcamento_id: orcamento.id,
                        itens_saloes_id: ItemItensOrcamentosData.id,
                        quantidade: ItemItensOrcamentosData.quantidade,
                        novo_valor_unitario: ItemItensOrcamentosData.valorUnitario,
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
            itensOrcamentos, setItensOrcamentos, getItensOrcamentos,
            insertItemItensOrcamentos, updateItemItensOrcamentos
        }}>
            {children}
        </ItensOrcamentosContext.Provider>
    );
}