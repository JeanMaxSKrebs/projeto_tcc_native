import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Dia from './Dia';
import { COLORS } from '../../assets/colors';
import MeuButton from '../MeuButton';
import Texto from '../Texto';
import MeuButtonMetade from '../MeuButtonMetade';
import { CommonActions } from '@react-navigation/native';

const Calendario = ({ reservas, onPress, reservarButton, dataReserva, horarioReserva }) => {
  const [selected, setSelected] = useState(dataReserva || '');
  const [selectedInfo, setSelectedInfo] = useState('');

  const [selectedTime, setSelectedTime] = useState(horarioReserva || '');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  console.log('entrou calendario');
  console.log(reservas);
  console.log(dataReserva);
  console.log(horarioReserva);


  useEffect(() => {
    console.log('entrou mesmo');

    if (dataReserva) {
      let info = buscarInformacoesDoDia(dataReserva);
      setSelectedInfo(info);
    }
  }, []);

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
    // console.log('day');
    // console.log(day);
    setSelected(day.dateString);

    const info = buscarInformacoesDoDia(day.dateString);
    setSelectedInfo(info);
  };

  const buscarInformacoesDoDia = (data) => {

    return <Dia data={data} tamanho={20} />
  };

  const handleDateConfirm = (date) => {
    setSelectedTime(date.toLocaleTimeString());
    setDatePickerVisibility(false);
  };


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  return (
    <View style={styles.container}>
      <Texto texto={'Calendário'} tamanho={25} />

      <Calendar
        minDate={dataAtualFormatada}
        // style={{ backgroundColor: COLORS.primaryShadow }}
        onDayPress={handleDayPress}
        markedDates={markedDates}
      />
      {selected !== '' && (
        <View>
          <Text style={styles.infoText}>{selectedInfo}</Text>
          {selectedTime !== '' && (
            <View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Horário: {selectedTime}</Text>
              </View>

            </View>
          )}
          <View style={styles.infoContainer}>
            <MeuButtonMetade width={'50%'} texto={selectedTime ? 'Trocar Horário' : 'Escolher Horário'} onClick={showDatePicker} />
            {reservarButton && selectedTime && (
              <MeuButtonMetade texto={'Reservar'} onClick={() => onPress(['Reservar', selected, selectedTime])} />
            )}
          </View>
        </View>
      )
      }
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View >
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Centraliza horizontalmente
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Calendario;
