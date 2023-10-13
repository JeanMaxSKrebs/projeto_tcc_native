/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect, useContext } from 'react';
import { Alert, Button, ToastAndroid } from 'react-native';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    TextInput,
    StyleSheet,
} from 'react-native';
import MeuButtonMetade from '../../components/MeuButtonMetade';
import AnotherButtonMetade from '../../components/AnotherButtonMetade';
import { SalaoContext } from '../../context/SalaoProvider';
import { Container, FlatList, ContainerImage } from './styles';
import { COLORS } from '../../assets/colors';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { Picker } from '@react-native-picker/picker';
import { FestaContext } from '../../context/FestaProvider';
import Dia from '../../components/Calendario/Dia';
import Horario from '../../components/Calendario/Horario';
import { OrcamentosContext } from '../../context/OrcamentosProvider';
import { ClienteContext } from '../../context/ClienteProvider';
import { CommonActions } from '@react-navigation/native';


const InfoFesta = ({ route, navigation }) => {
    const { cliente, getClientById } = useContext(ClienteContext);
    const { orcamento, getOrcamentoById } = useContext(OrcamentosContext);
    const { festa, getFestaByReservaId } = useContext(FestaContext);
    const { updateStatus } = useContext(SalaoContext);
    const [novoStatus, setNovoStatus] = useState('');

    const reserva = route.params.reserva
    // const cliente = route.params.cliente
    // const salao = route.params.salao

    const voltar = () => {
        navigation.goBack();
    };

    useEffect(() => {
        setNovoStatus(reserva.status)
        getClientById(reserva.cliente_id);
        getOrcamentoById(reserva.orcamento_id)
        getFestaByReservaId(reserva.id)
    }, []);

    const handleChangeStatus = (novoStatus) => {
        console.log('novoStatus');
        console.log(novoStatus);
        setNovoStatus(novoStatus);
    };

    const save = async () => {
        let reservaAtualizada;

        if (novoStatus) {
            reservaAtualizada = { ...reserva, status: novoStatus };
        } else {
            reservaAtualizada = { ...reserva };
        }
        console.log('reservaAtualizada');
        console.log(reservaAtualizada);
        {
            await updateStatus(reservaAtualizada) ?
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'MinhasReservas',
                    })
                ) : showToast('Erro ao Aceitar Reserva!')
        }
    };


    const routeFesta = item => {
        // console.log('gerenciador');
        // console.log(item);
        switch (item) {
            case 'Mudar':
                navigation.dispatch(
                    CommonActions.navigate({
                        name: item,
                        params: { salao: salao },
                    }),
                );
                break;

            case 'Conversar':
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Chats',
                        params: { user: salao }
                    }),
                );
                break;

            default:
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Manutencao',
                        params: { value: item }
                    }),
                );
                break;
        }
    };


    return (
        <SafeAreaView>
            <View>
                <Voltar texto="Voltar" onClick={() => voltar()} />
            </View>
            <ScrollView style={{ height: '90%' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={{
                            uri: 'https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/imagens%20saloes/salao%20a.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZW5zIHNhbG9lcy9zYWxhbyBhLmpwZWciLCJpYXQiOjE2ODc5OTgzOTksImV4cCI6MTcxOTUzNDM5OX0.WI1WLP0lK-y3_8Hbc--JoHCUaJ8CASA5pUnV24kvO4o&t=2023-06-29T00%3A26%3A39.877Z'
                        }}
                        key={'logo'}
                        style={{ width: 280, height: 250, borderRadius: 15 }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MeuButtonMetade texto="Conversar com o Cliente" onClick={() => routeFesta('Conversar')} style={{ width: '45%' }} />
                        <MeuButtonMetade texto={'Salvar Alterações'} onClick={() => save()} style={{ width: '45%' }} />
                    </View>
                    {/* {console.log('cliente')}
                    {console.log(cliente)} */}
                    {/* {console.log('reserva')}
                    {console.log(reserva)}
                    {console.log('orcamento')}
                    {console.log(orcamento)} */}
                    {/* {console.log('festa')}
                {console.log(festa)} */}
                    <Texto texto={'CONFIGURAÇÕES DA FESTA'} tamanho={25} />
                    {/* <Texto texto={reserva.id} tamanho={25} /> */}
                    {/* <Texto texto={cliente.nome} tamanho={25}/> */}
                    <Picker
                        style={{ width: 150, height: 50 }}
                        selectedValue={novoStatus}
                        onValueChange={(itemValue) => handleChangeStatus(itemValue)}
                    >
                        <Picker.Item label="ativo" value="ativo" />
                        <Picker.Item label="inativo" value="inativo" />
                    </Picker>
                    <View style={styles.container}>
                        <View style={styles.containerSon}>
                            <Texto texto="Detalhes da Reserva" tamanho={25} />
                        </View>
                        <View style={styles.containerSon}>
                            <Texto texto={`Status: ${reserva.status}`} tamanho={18} />
                            <Texto texto={`Data da Reserva:`} tamanho={18} />
                            <Dia data={reserva.data_hora} tamanho={16} />
                            <Texto texto={`Horário da Reserva:`} tamanho={18} />
                            <Horario data={reserva.data_hora} tamanho={16} />
                        </View>
                    </View>

                    {cliente && (
                        <View style={styles.container}>
                            <View style={styles.containerSon}>
                                <Texto texto="Detalhes do Cliente" tamanho={25} />
                            </View>
                            <View style={styles.containerSon}>
                                <Texto texto={`Nome: ${cliente.nome}`} tamanho={18} />
                                <Texto texto={`Email: ${cliente.email}`} tamanho={18} />
                                <Texto texto={`Telefone: ${cliente.telefone}`} tamanho={18} />
                                <Texto texto={`CPF: ${cliente.cpf}`} tamanho={18} />
                            </View>
                        </View>
                    )}
                    {festa && (
                        <View style={styles.container}>
                            <View style={styles.containerSon}>
                                <Texto texto="Detalhes da Festa" tamanho={25} />
                            </View>
                            <View style={styles.containerSon}>
                                <Texto texto={`Nome: ${festa.nome}`} tamanho={18} />
                                <Texto texto={`Duração: ${festa.duracao}`} tamanho={18} />
                                <Texto texto={`Número de Convidados: ${festa.num_convidados}`} tamanho={18} />
                            </View>
                        </View>
                    )}
                    {orcamento && (
                        <View style={styles.container}>
                            <View style={styles.containerSon}>
                                <Texto texto="Orcamento da Festa" tamanho={25} />
                            </View>
                            <View style={styles.containerSon}>
                                <Texto texto={`Nome: ${orcamento.nome}`} tamanho={18} />
                                <Texto texto={`Descrição: ${orcamento.descricao}`} tamanho={18} />
                                <Texto texto={`Valor Total: ${orcamento.valorTotal}`} tamanho={18} />
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default InfoFesta;

const styles = {
    container: {
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 15,
        padding: 10,
        margin: 10,
        width: '80%',
    },
    containerSon: {
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: 10,
    },
};
