import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from '../../assets/colors';
import Texto from '../../components/Texto';
import { CommonActions } from '@react-navigation/native';
import Dia from '../../components/Calendario/Dia';
import Calendario from '../../components/Calendario';
import { SalaoContext } from '../../context/SalaoProvider';
import Voltar from '../../components/Voltar';
import MeuButtonMetade from '../../components/MeuButtonMetade';

const Reservar = ({ route, navigation }) => {
    const [orcamento, setOrcamento] = useState(route.params.orcamento);
    const { reservas, getReservasPorSalao } = useContext(SalaoContext);

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const salao = route.params.salao;
    const cliente = route.params.cliente;
    // const dataReserva = route.params.dataReserva;
    const [dataReserva, setDataReserva] = useState(route.params.dataReserva);
    const [horarioReserva, setHorarioReserva] = useState(route.params.horarioReserva);

    const voltar = () => {
        navigation.goBack();
    };

    const selecionarOrcamento = () => {
        console.log(salao);
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Orcamentos',
                params: {
                    salao: salao, cliente: cliente,
                    dataReserva: dataReserva, horarioReserva: horarioReserva
                }
            }),
        );
    };

    useEffect(() => {
        console.log('salao');
        console.log(salao);
        getReservasPorSalao(salao.id);
    }, []);

    const reservar = () => {
        // Perform reservation logic here
        // You can use the 'name', 'date', and 'time' state variables to send data to your backend or perform other actions.
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <Voltar texto="Voltar" onClick={() => voltar()} />
                <View style={styles.container}>
                    <Texto style={styles.texto} tamanho={40} cor={COLORS.secundary} texto={'Solicitação de Reserva'} />
                    <Text style={styles.textoMenor}>Preencha os detalhes:</Text>
                    {orcamento ? (
                        <View>
                            <View>
                                <Texto tamanho={20} texto={`Orçamento Selecionado: ${orcamento.nome}`} />
                            </View>
                            <MeuButtonMetade width={'auto'} tamanho={25}
                                texto={'Trocar Orçamento'} onClick={selecionarOrcamento}
                            />
                        </View>
                    ) : (
                        <MeuButtonMetade width={'auto'} tamanho={25}
                            texto={'Selecionar Orçamento'} onClick={selecionarOrcamento}
                        />
                    )}
                    <Calendario reservas={reservas} dataReserva={dataReserva} horarioReserva={horarioReserva} onPress={setDataReserva} />
                    {/* {console.log('dataReserva t')}
                    {console.log(dataReserva)} */}


                    <MeuButtonMetade width={'auto'} tamanho={25}
                        texto={'Reservar'} onClick={reservar}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Reservar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    texto: {
        textAlign: 'center',
        fontSize: 40,
        color: COLORS.red,
        marginBottom: 20,
    },
    textoMenor: {
        textAlign: 'center',
        fontSize: 20,
        color: COLORS.secondary,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
