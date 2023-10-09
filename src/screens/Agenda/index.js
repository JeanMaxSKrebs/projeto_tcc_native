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
    // const salao = route.params.value;
    // const cliente = route.params.cliente;

    const [salao, setSalao] = useState(route.params.value);
    const [cliente, setCliente] = useState(route.params.cliente);
    const [modalVisible, setModalVisible] = useState(false);

    // Função para voltar à tela anterior (Agenda)
    const voltar = () => {
        navigation.goBack();
    };

    useEffect(() => {
        if (salao) {
            // console.log('salao');
            // console.log(salao);
            getReservasPorSalao(salao.id);
        }
    }, [route]);


    const renderItem = ({ item }) => {
        // console.log('itemitem');
        // console.log(item);
        //data formatada
        const data = item.data_hora.split('T')[0];

        return (
            <View style={styles.item}>
                <MeuButtonMetade width={'auto'} texto={<Dia data={data} tamanho={16} />}
                    onClick={() => { setModalVisible(false), routeFor(['Festa', item]) }}
                />
            </View>

        )
    }

    const routeFor = dados => {
        // console.log('a');
        // console.log(dados);
        switch (dados[0]) {
            case 'VerFesta':

                navigation.dispatch(
                    CommonActions.navigate({
                        name: dados[0],
                        params: { dataReserva: dados[1], horarioReserva: dados[2], salao: salao, cliente: cliente },
                    }),
                );
                break;
            case 'Reservar':
                navigation.dispatch(
                    CommonActions.navigate({
                        name: dados[0],
                        params: { dataReserva: dados[1], horarioReserva: dados[2], salao: salao, cliente: cliente },
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


    return (
        <SafeAreaView>
            <ScrollView>
                <Voltar texto="Voltar" onClick={() => voltar()} />
                <View style={styles.container}>
                    <Texto style={styles.texto} tamanho={40} cor={COLORS.secundary} texto={'Visualizar Agenda'} />

                    {/* {console.log('reservas')}
                    {console.log(reservas)} */}
                    {/* {console.log('cliente')}
                    {console.log(cliente)} */}
                    <View style={styles.calendario}>
                        <Calendario reservas={reservas} onPress={routeFor} reservarButton cliente={cliente} />
                    </View>
                    <MeuButtonMetade
                        borda
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
        // backgroundColor: COLORS.primaryShadow,
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
        // backgroundColor: COLORS.primaryShadow,
        backgroundColor: COLORS.background,
        // padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    lado: {
        flexDirection: 'row'
    },
});