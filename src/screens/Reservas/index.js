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

const Reservas = ({ route, navigation }) => {
    const { reservas, getReservasPorSalao } = useContext(SalaoContext);

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const salao = route.params.salao;
    const cliente = route.params.cliente;
    // const dataReserva = route.params.dataReserva;
    const [modalVisible, setModalVisible] = useState(true);
    const [selectedModal, setSelectedModal] = useState('Modal1');


    const voltar = () => {
        navigation.goBack();
    };

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


    useEffect(() => {
        if (salao) {
            console.log('reservas');
            console.log(reservas);
            // console.log('salao');
            // console.log(salao);
            getReservasPorSalao(salao.id);
        }
    }, []);

    const reservar = () => {
        // Perform reservation logic here
        // You can use the 'name', 'date', and 'time' state variables to send data to your backend or perform other actions.
    };

    const renderItem = ({ item }) => {
        // console.log('itemitem');
        // console.log(item);
        //data formatada
        const data = item.data_hora.split('T')[0];

        return (
            <View style={styles.item}>
                <Dia data={data} tamanho={16} />
            </View >
        )
    }

    const Modal1 = () => {
        return (

            <View style={styles.container}>
                <Texto texto={'Horários de Reservas Efetuadas do Salão'} tamanho={25} />
                <FlatList
                    data={reservasPassadas}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />

            </View>
        );
    };

    const Modal2 = () => {
        return (

            <View style={styles.container}>
                <Texto texto={'Horários de Reservas Futuras do Salão'} tamanho={25} />
                <FlatList
                    data={reservasFuturas}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />

            </View>
        );
    };

    const renderModal = () => {
        switch (selectedModal) {
            case "Modal1":
                return <Modal1 modalVisible={modalVisible} fecharModal={fecharModal} />;
            case "Modal2":
                return <Modal2 modalVisible={modalVisible} fecharModal={fecharModal} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView>
            <View>
                <Voltar texto="Voltar" onClick={() => voltar()} />
                <View style={styles.containerButton}>
                    <MeuButtonMetade
                        tamanho={25}
                        texto={'Reservas Efetuadas'}
                        onClick={() => { setSelectedModal('Modal1'), abrirModal() }}
                    />
                    <MeuButtonMetade
                        tamanho={25}
                        texto={'Reservas Futuras'}
                        onClick={() => { setSelectedModal('Modal2'), abrirModal() }}
                    />
                </View>

                <View style={styles.containerSon}>
                    {selectedModal && renderModal()}
                </View>
            </View>
        </SafeAreaView >
    );
};

export default Reservas;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 15,
        padding: 10,
    },
    containerSon: {
        padding: 10,
        backgroundColor: COLORS.primaryShadow,
        alignItems: 'center',

    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item: {
        backgroundColor: COLORS.primaryShadow,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});