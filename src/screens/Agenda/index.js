import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Button, FlatList, ScrollView } from 'react-native';
import { COLORS } from '../../assets/colors';
import Texto from '../../components/Texto';
import { SalaoContext } from '../../context/SalaoProvider';
import MeuButton from '../../components/MeuButton';
import Calendario from '../../components/Calendario';
import Dia from '../../components/Calendario/Dia';
import Voltar from '../../components/Voltar';
import { SafeAreaView } from 'react-native-safe-area-context';

const Agenda = ({ route, navigation }) => {
    const { reservas, getReservasPorSalao } = useContext(SalaoContext);
    const salao = route.params.value;

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

    return (
        <SafeAreaView>
            <Voltar texto="Voltar" onClick={() => voltar()} />
            <View style={styles.container}>
                <Texto style={styles.texto} tamanho={40} cor={COLORS.secundary} texto={'Visualizar Agenda'} />

                {console.log('reservas')}
                {console.log(reservas)}
                <View style={styles.calendario}>
                    <Texto texto={'Calendário'} tamanho={25} />
                    <Calendario reservas={reservas} />
                </View>

            </View>
        </SafeAreaView>
    );
};

export default Agenda;

const styles = StyleSheet.create({
    calendario: {
        // backgroundColor: COLORS.background,
        borderRadius: 15,
        margin: 10,
        padding: 10,
    },
    horario: {
        backgroundColor: COLORS.background,
        borderRadius: 15,
        margin: 10,
        padding: 10,
    },
    container: {
        margin: 10,
        alignItems: 'center',
    },
    item: {
        backgroundColor: COLORS.primaryShadow,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },

});