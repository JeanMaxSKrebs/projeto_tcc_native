import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Modal, FlatList, ScrollView } from 'react-native';
import { COLORS } from '../../assets/colors';
import Texto from '../../components/Texto';
import { SalaoContext } from '../../context/SalaoProvider';
import MeuButton from '../../components/MeuButton';
import Calendario from '../../components/Calendario';
import Dia from '../../components/Calendario/Dia';
import Voltar from '../../components/Voltar';
import { SafeAreaView } from 'react-native-safe-area-context';
import MeuButtonMetade from '../../components/MeuButtonMetade';
import { CommonActions } from '@react-navigation/native';

const Agenda = ({ route, navigation }) => {
    const { reservas, getReservasPorSalao } = useContext(SalaoContext);
    const salao = route.params.value;
    const cliente = route.params.cliente;
    const [modalVisible, setModalVisible] = useState(false);

    // Função para voltar à tela anterior (Agenda)
    const voltar = () => {
        navigation.goBack();
    };

    useEffect(() => {
        console.log('salao');
        console.log(salao);
        getReservasPorSalao(salao.id);
    }, []);


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

    const routeFor = dados => {
        console.log('a');
        console.log(dados);
        navigation.dispatch(
            CommonActions.navigate({
                name: dados[0],
                params: { reserva: dados[1], salao: salao, cliente: cliente },
            }),
        );
    };


    return (
        <SafeAreaView>
            <ScrollView>
                <Voltar texto="Voltar" onClick={() => voltar()} />
                <View style={styles.container}>
                    <Texto style={styles.texto} tamanho={40} cor={COLORS.secundary} texto={'Visualizar Agenda'} />

                    {console.log('reservas')}
                    {console.log(reservas)}
                    <View style={styles.calendario}>
                        <Texto texto={'Calendário'} tamanho={25} />
                        <Calendario reservas={reservas} onPress={routeFor} reservarButton />
                    </View>
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

                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default Agenda;

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