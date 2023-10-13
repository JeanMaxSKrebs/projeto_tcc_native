import React from 'react';
import { View, Text } from 'react-native';

const Horario = ({ data, tamanho }) => {
    // Converte a data fornecida em um objeto Date
    const dataSelecionada = new Date(data);

    // Formata a data e a hora
    const horaFormatada = dataSelecionada.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return (
        <View>
            <Text style={{ fontSize: tamanho }}>
                {horaFormatada}
            </Text>
        </View>
    );
}

export default Horario;
