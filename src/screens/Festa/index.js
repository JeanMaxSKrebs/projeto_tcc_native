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

const Festa = ({ route, navigation }) => {
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
        { await updateStatus(reservaAtualizada) ? voltar() : showToast('Erro ao Aceitar Reserva!') }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Voltar texto="Voltar" onClick={() => voltar()} />
            </View>
            <ScrollView>
                {console.log('reserva')}
                {console.log(reserva)}
                <Container>
                    <Texto texto={'FESTA SCREE'} tamanho={25} />
                    <Texto texto={reserva.id} tamanho={25} />
                    {/* <Texto texto={cliente.nome} tamanho={25}/> */}
                    <Picker
                        style={{ width: 150, height: 50 }}
                        selectedValue={novoStatus}
                        onValueChange={(itemValue) => handleChangeStatus(itemValue)}
                    >
                        <Picker.Item label="ativo" value="ativo" />
                        <Picker.Item label="inativo" value="inativo" />
                    </Picker>
                    <View>
                        <MeuButtonMetade texto={'Salvar'} onClick={() => save()} />
                    </View>
                </Container>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Festa;

const styles = {
    prevButton: {
        color: '#FFF34D',
        fontSize: 50,
    },
    nextButton: {
        color: '#FFF34D',
        fontSize: 50,
    },

    container: {
        flex: 1,
    },

    wrapper: {},

    slide: {
        alignItems: 'center',
    },
};
