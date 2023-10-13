import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, SafeAreaView, ScrollView, Modal } from 'react-native';
import { COLORS } from '../../assets/colors';
import Texto from '../../components/Texto';
import { CommonActions } from '@react-navigation/native';
import Dia from '../../components/Calendario/Dia';
import Calendario from '../../components/Calendario';
import { SalaoContext } from '../../context/SalaoProvider';
import Voltar from '../../components/Voltar';
import MeuButtonMetade from '../../components/MeuButtonMetade';
import { ClienteContext } from '../../context/ClienteProvider';
import { AuthUserContext } from '../../context/AuthUserProvider';
import LogoutButton from '../../components/LogoutButton';
import supabase from '../../services/supabase';

const MinhasReservas = ({ navigation }) => {
    const { salao, getHallData, reservas,
        getReservasPorCliente, getReservasPorSalao } = useContext(SalaoContext);
    const { cliente, getClientData } = useContext(ClienteContext)
    const { user } = useContext(AuthUserContext);

    const [modalVisible, setModalVisible] = useState(true);
    const [selectedModal, setSelectedModal] = useState('Modal1');

    const abrirModal = () => {
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
    };

    const dataAtual = new Date(); // Obtém a data e hora atual

    // Filtra as reservas futuras
    const reservasFuturas = reservas.filter((reserva) => {
        const dataReserva = new Date(reserva.data_hora); // Converte a data da reserva em um objeto Date
        return dataReserva > dataAtual;
    });

    // Filtra as reservas passadas
    const reservasPassadas = reservas.filter((reserva) => {
        const dataReserva = new Date(reserva.data_hora); // Converte a data da reserva em um objeto Date
        return dataReserva <= dataAtual;
    });

    const reservasPassadasAtivas = reservasPassadas.filter((reserva) => reserva.status === 'ativo');

    // Filtra as reservas ativas e futuras
    const reservasFuturasAtivas = reservasFuturas.filter((reserva) => reserva.status === 'ativo');

    // Filtra as reservas ativas
    const reservasAtivas = reservas.filter((reserva) => reserva.status === 'ativo');

    // Filtra as reservas inativas e futuras
    const reservasFuturasInativas = reservasFuturas.filter((reserva) => reserva.status == 'inativo');


    useEffect(() => {
        // console.log('reservasInativas');
        // console.log(reservasInativas);
        // console.log(reservas);
        // console.log(reservasFuturas);
        // console.log(reservasPassadas);

        getClientData(user.email);
        getHallData();

        console.log('cliente');
        console.log(cliente);
        console.log('salao');
        console.log(salao);
        if (cliente) {
            getReservasPorCliente(cliente.id)
        }
        if (salao) {
            getReservasPorSalao(salao.id)
        }
        navigation.setOptions({
            // headerLeft: false,
            headerTitleAlign: 'center',
            title: 'Reservas', // deixei a name pq senao muda o nome da tab
            headerStyle: { backgroundColor: COLORS.primaryDark },
            headerTintColor: { color: COLORS.black },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <LogoutButton />,
        });
    }, [navigation]);

    useEffect(() => {

    }, []);

    const renderItem = ({ item }) => {
        const data = item.data_hora.split('T')[0];

        return (
            <MeuButtonMetade style={styles.item} width={'auto'} cor={COLORS.primaryShadow} texto={<Dia data={data} tamanho={16} />}
                onClick={() => {
                    setModalVisible(false)
                    routeFor(['InfoFesta', item])
                }}
            />
        )
    }

    const routeFor = dados => {

        switch (dados[0]) {
            case 'InfoFesta':

                navigation.dispatch(
                    CommonActions.navigate({
                        name: dados[0],
                        params: { reserva: dados[1] },
                    }),
                );
                break;

            default:
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'Manutencao',
                        params: { value: dados[0] },
                    }),
                );
                break;
        }

    };

    const Modal1 = () => {
        return (

            <View style={styles.container}>
                <View style={styles.containerTexto}>
                    <Texto texto={'Horários de Reservas Concluídas'} tamanho={25} />
                </View>
                <View style={{ height: '70%' }}>
                    <FlatList
                        data={reservasPassadasAtivas}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>

            </View>
        );
    };

    const Modal2 = () => {
        return (

            <View style={styles.container}>
                <View style={styles.containerTexto}>
                    <Texto texto={'Horários de Reservas Solicitadas'} tamanho={25} />
                </View>
                <View style={{ height: '70%' }}>

                    <FlatList
                        data={reservasFuturasInativas}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />

                </View>
            </View>
        );
    };

    const Modal3 = () => {
        return (

            <View style={styles.container}>
                <View style={styles.containerTexto}>
                    <Texto texto={'Horários de Reservas Aceitas'} tamanho={25} />
                </View>
                <View style={{ height: '70%' }}>

                    <FlatList
                        data={reservasFuturasAtivas}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />

                </View>
            </View>
        );
    };

    const renderModal = () => {
        switch (selectedModal) {
            case "Modal1":
                return <Modal1 modalVisible={modalVisible} fecharModal={fecharModal} />;
            case "Modal2":
                return <Modal2 modalVisible={modalVisible} fecharModal={fecharModal} />;
            case "Modal3":
                return <Modal3 modalVisible={modalVisible} fecharModal={fecharModal} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView>
            <View>
                <View style={styles.containerButton}>
                    <MeuButtonMetade
                        width={'30%'}
                        tamanho={25}
                        texto={'Reservas Concluídas'}
                        onClick={() => { setSelectedModal('Modal1'), abrirModal() }}
                    />
                    <MeuButtonMetade
                        width={'30%'}
                        tamanho={25}
                        texto={'Reservas Solicitadas'}
                        onClick={() => { setSelectedModal('Modal2'), abrirModal() }}
                    />
                    <MeuButtonMetade
                        width={'30%'}
                        tamanho={25}
                        texto={'Reservas Aceitas'}
                        onClick={() => { setSelectedModal('Modal3'), abrirModal() }}
                    />
                </View>

                <View style={styles.containerSon}>
                    {selectedModal && renderModal()}
                </View>
            </View>
        </SafeAreaView >
    );
};

export default MinhasReservas;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 15,
        padding: 10,
        margin: 10,
    },
    containerTexto: {
        alignItems: 'center',
        backgroundColor: COLORS.background,
        padding: 10,
        margin: 10,
    },
    containerSon: {
        padding: 10,
        backgroundColor: COLORS.primaryShadow,
        alignItems: 'center',

    },
    containerButton: {
        flexDirection: 'row',
        margin: 5,
    },
    item: {
        backgroundColor: COLORS.primaryShadow,
        marginVertical: 8,
        marginHorizontal: 8,
    },
});