import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Dia from './Dia';
import { COLORS } from '../../assets/colors';
import MeuButton from '../MeuButton';
import Texto from '../Texto';
import MeuButtonMetade from '../MeuButtonMetade';

const Calendario = ({ reservas }) => {
  const [selected, setSelected] = useState('');
  const [selectedInfo, setSelectedInfo] = useState('');

  console.log('entrou calendario');
  console.log(reservas);

  const markedDates = {};

  // Marcar o dia atual como reserva
  const dataAtual = new Date();
  const dataAtualFormatada = `${dataAtual.getFullYear()}-${String(dataAtual.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(dataAtual.getDate()).padStart(2, '0')}`;
  markedDates[dataAtualFormatada] = { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' };


  // Converte as datas das reservas em um formato aceito pelo calendário
  reservas.forEach((reserva) => {
    const date = reserva.data_hora.split('T')[0];
    // markedDates[date] = { marked: true, dotColor: 'red' };
    markedDates[date] = {
      marked: true,
      selected: true,
      disabled: true,
      disableTouchEvent: true,
      // disableTouchEvent: true,
      dotColor: 'red',
      selectedColor: 'red',
    }
  });


  const handleDayPress = (day) => {
    setSelected(day.dateString);

    // Aqui você pode buscar informações adicionais com base na data selecionada
    // e atualizar o estado selectedInfo com essas informações.
    // Por exemplo, você pode consultar informações de reserva para a data selecionada.
    const info = buscarInformacoesDoDia(day.dateString);
    setSelectedInfo(info);
  };

  const buscarInformacoesDoDia = (data) => {

    return <Dia data={data} tamanho={20}/>
  };

  return (
    <View style={styles.container}>
      <Calendar
        minDate={dataAtualFormatada}
        // style={{ backgroundColor: COLORS.primaryShadow }}
        onDayPress={handleDayPress}
        markedDates={markedDates}
      />

      {selected !== '' && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{selectedInfo}</Text>
          <MeuButtonMetade texto={'Reservar'} onClick={() => { }} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Calendario;
