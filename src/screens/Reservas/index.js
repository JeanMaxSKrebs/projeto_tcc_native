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

    const [modalVisible, setModalVisible] = useState(false);


    const voltar = () => {
        navigation.goBack();
    };



    useEffect(() => {
        if (salao) {
            console.log('salao');
            console.log(salao);
            getReservasPorSalao(salao.id);
        }
    }, []);

    const reservar = () => {
        // Perform reservation logic here
        // You can use the 'name', 'date', and 'time' state variables to send data to your backend or perform other actions.
    };

    const renderItem = ({ item }) => {
        console.log('itemitem');
        console.log(item);
        //data formatada
        const data = item.data_hora.split('T')[0];

        return (
            <View style={styles.item}>
                <Dia data={data} tamanho={16} />
            </View>

        )
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <Voltar texto="Voltar" onClick={() => voltar()} />
                <View style={styles.container}>
                    <MeuButtonMetade
                        width={'auto'}
                        tamanho={25}
                        texto={'Horários Reservados do Salão'}
                        onClick={() => setModalVisible(true)}
                    />
                    <Modal
                        animationType="slide" // Você pode ajustar a animação conforme desejado
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(false);
                        }}
                    >
                        <View style={styles.modal}>
                            <View style={styles.horario}>
                                <Texto texto={'Horários Reservados do Salão'} tamanho={25} />
                                <FlatList
                                    data={reservas}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                                <MeuButtonMetade
                                    width={'auto'}
                                    tamanho={25}
                                    texto={'Voltar'}
                                    onClick={() => setModalVisible(false)}
                                />

                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Reservas;

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    calendario: {
        // backgroundColor: COLORS.background,
        borderRadius: 15,
        margin: 10,
        padding: 10,
    },
    horario: {
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 15,
        margin: 10,
        padding: 10,
    },
    container: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        backgroundColor: COLORS.primaryShadow,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});