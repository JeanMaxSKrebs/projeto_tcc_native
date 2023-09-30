import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { COLORS } from '../../assets/colors';
import Texto from '../../components/Texto';
import { CommonActions } from '@react-navigation/native';

const Reservar = ({ route, navigation }) => {
    const [orcamento, setOrcamento] = useState(route.params.orcamento);

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const salao = route.params.salao;
    const cliente = route.params.cliente;

    const selecionarOrcamento = () => {
        console.log(salao);
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Orcamentos',
                params: { salao: salao, cliente: cliente }
            }),
        );
    };

    const reservar = () => {
        // Perform reservation logic here
        // You can use the 'name', 'date', and 'time' state variables to send data to your backend or perform other actions.
    };

    return (
        <View style={styles.container}>
            <Texto style={styles.texto} tamanho={40} cor={COLORS.secundary} texto={'Solicitação de Reserva'} />
            <Text style={styles.textoMenor}>Preencha os detalhes:</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Date"
                value={date}
                onChangeText={(text) => setDate(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Time"
                value={time}
                onChangeText={(text) => setTime(text)}
            />
            {orcamento ? (
                <View>
                    <View>
                        <Texto tamanho={20} texto={`Orçamento Selecionado: ${orcamento.nome}`} />
                    </View>
                    <Button title="Trocar Orçamento" onPress={selecionarOrcamento} />
                </View>
            ) : (
                <Button title="Selecionar Orçamento" onPress={selecionarOrcamento} />
            )}

            <Button title="Reservar" onPress={reservar} />

            <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
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
