import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../../assets/colors';
import Texto from '../Texto';

const Dia = ({ data, tamanho }) => {
    // console.log('datadata');
    // console.log(data);
    // Converte a data selecionada em um objeto Date
    const dataSelecionada = new Date(data);

    // Array com os nomes dos dias da semana
    const diasDaSemana = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
    ];

    // Obtém o número do dia da semana (0 para Domingo, 1 para Segunda-feira, etc.)
    const numeroDoDiaDaSemana = dataSelecionada.getDay();

    // Obtém o nome do dia da semana correspondente
    const nomeDoDiaDaSemana = diasDaSemana[numeroDoDiaDaSemana];
    return (
        <View>
            <Texto tamanho={tamanho} texto={nomeDoDiaDaSemana + ' dia ' + dataSelecionada.getDate()
                + ' de ' + dataSelecionada.toLocaleDateString('pt-BR', { month: 'long' })
                + ' de ' + dataSelecionada.getFullYear()} />
        </View>
    );
}


export default Dia;
