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
import { ToastAndroid } from 'react-native';

const Reservar = ({ route, navigation }) => {
    const { reservas, getReservasPorSalao, createReserva } = useContext(SalaoContext);

    const orcamento = route.params.orcamento;
    const salao = route.params.salao;
    const cliente = route.params.cliente;
    const user = route.params.user;
    // const dataReserva = route.params.dataReserva;
    const [dataReserva, setDataReserva] = useState(route.params.dataReserva);
    const [horarioReserva, setHorarioReserva] = useState(route.params.horarioReserva);

    const showToast = message => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

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
                    dataReserva: dataReserva, horarioReserva: horarioReserva,
                    user: user
                }
            }),
        );
    };

    useEffect(() => {
        if (salao) {
            // console.log('salao');
            // console.log(salao);
            getReservasPorSalao(salao.id);
        }
    }, []);

    function converterHora(dia, hora) {
        console.log('dia');
        console.log(dia);
        console.log('hora');
        console.log(hora);

        const parsedDate = `${dia}T${hora}`; // tem um T no meio nao esquecer
        // console.log('parsedDate');
        // console.log(parsedDate);
        

        return parsedDate;
      }

    const reservar = async (dado) => {
        console.log('dado'); // dado
        console.log(dado); // ["Reservar", "2023-10-18", "1:35:00 AM", ]
        setDataReserva(dado[1])
        setHorarioReserva(dado[2])

        const dataHoraString = converterHora(dado[1], dado[3])
        console.log('dataHoraString');
        console.log(dataHoraString);

        if (salao && cliente) {
            // console.log('salao');
            // console.log(salao.id);
            // console.log('user');
            // console.log(user.id);

            if (orcamento) {
                const dados = {};
                dados.data_hora = dataHoraString
                dados.salao_id = salao.id
                dados.cliente_id = user.id
                dados.orcamento_id = orcamento.id

                {await createReserva(dados) ? voltar() : showToast('Erro ao Reservar!')}
            } else {
                showToast('Selecione orcamento da Reserva!');
            }
        } else {
            showToast('Você é um salão, logo não pode reservar');
        }

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
                                {/* <Texto tamanho={20} texto={`Orçamento Selecionado: ${orcamento.nome}`} /> */}
                                <Texto tamanho={20} texto={`Orçamento Selecionado: `} />
                                <Texto tamanho={20} cor={COLORS.green} texto={orcamento.nome} />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <MeuButtonMetade width={'auto'} tamanho={25}
                                    texto={'Trocar Orçamento'} onClick={selecionarOrcamento}
                                />
                            </View>
                        </View>
                    ) : (
                        <MeuButtonMetade width={'auto'} tamanho={25}
                            texto={'Selecionar Orçamento'} onClick={selecionarOrcamento}
                        />
                    )}
                    <Calendario reservas={reservas} dataReserva={dataReserva}
                        horarioReserva={horarioReserva} onPress={reservar}
                        cliente={cliente} />
                    {/* {console.log('dataReserva t')}
                    {console.log(dataReserva)} */}


                    {/* <MeuButtonMetade width={'auto'} tamanho={25}
                        texto={'Reservar'} onClick={reservar}
                    /> */}
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
