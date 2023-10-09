import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Dia from './Dia';
import { COLORS } from '../../assets/colors';
import MeuButton from '../MeuButton';
import Texto from '../Texto';
import MeuButtonMetade from '../MeuButtonMetade';
import Sumario from './Sumario';
import { CommonActions } from '@react-navigation/native';

const Calendario = ({ reservas, onPress, reservarButton, dataReserva, horarioReserva, cliente }) => {
  const [selected, setSelected] = useState(dataReserva || '');
  const [selectedInfo, setSelectedInfo] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [tamanhoSumario, setTamanhoSumario] = useState(50);
  const [selectedTime, setSelectedTime] = useState(horarioReserva || '');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedMarkedDate, setSelectedMarkedDate] = useState(false);

  // console.log('entrou calendario');
  // console.log('cliente2');
  // console.log(cliente);
  // console.log(reservas);
  // console.log(dataReserva);
  // console.log(horarioReserva);
  let sumario;

  if (cliente) {
    sumario = [
      { color: 'red', label: 'Dia Reservado' },
      { color: 'green', label: 'Dia Selecionado' },
      { color: 'deepskyblue', label: 'Dia Atual' },
    ]
  } else {
    sumario = [
      { color: 'green', label: 'Dia Reservado' },
      { color: COLORS.primaryDark, label: 'Dia Selecionado' },
      { color: 'deepskyblue', label: 'Dia Atual' },
    ]
  }

  useEffect(() => {
    // console.log('entrou mesmo');

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
  markedDates[dataAtualFormatada] = {
    selected: true,
    disableTouchEvent: true,
    dotColor: 'deepskyblue',
    selectedColor: 'deepskyblue',
  };


  // Converte as datas das reservas em um formato aceito pelo calendário
  reservas.forEach((reserva) => {
    const dateHour = reserva.data_hora.split('T');
    const date = dateHour[0];
    const hour = dateHour[1];
    // markedDates[date] = { marked: true, dotColor: 'red' };
    cliente ? (
      markedDates[date] = {
        marked: true,
        selected: true,
        disabled: true,
        disableTouchEvent: true,
        // disableTouchEvent: true,
        dotColor: 'red',
        selectedColor: 'red',
      }
    ) : (
      markedDates[date] = {
        hour: hour,
        marked: true,
        selected: true,
        dotColor: 'green',
        selectedColor: 'green',
      }
    )
  });

  function converterHora(dia, hora) {
    console.log('dia');
    console.log(dia);
    // Parse a string no formato "04:30:00+00:00"
    const parsedDate = new Date(`${dia}T${hora}`); // tem um T no meio nao esquecer

    // Formate a hora no formato "4:30:00 AM"
    const formattedHora = parsedDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    return formattedHora;
  }


  const handleDayPress = (day) => {
    // console.log('day');
    // console.log(day);
    setSelectedTime('')
    let dia = day.dateString;
    setSelected(dia);

    const info = buscarInformacoesDoDia(dia);
    setSelectedInfo(info);
    if (markedDates[dia]) {
      let hora = markedDates[dia].hour
      setSelectedMarkedDate(true)

      // console.log(converterHora(dia, hora));
      setSelectedTime(converterHora(dia, hora));
    } else {
      setSelectedMarkedDate(false)
    }

  };

  const buscarInformacoesDoDia = (data) => {

    return <Dia data={data} tamanho={20} />
  };

  const handleDateConfirm = (date) => {
    { console.log('date') }
    { console.log(date) }
    setSelectedTime(date.toLocaleTimeString());
    setDatePickerVisibility(false);
  };


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row', alignItems: 'center',
        marginBottom: 20, marginLeft: 30
      }}>
        <View>
          <Texto texto={'Calendário'} tamanho={25} />
        </View>

        <View style={{ marginLeft: 20 }}>
          <Sumario sumario={sumario} onPress tamanho={tamanhoSumario} />
        </View>
      </View>
      <Calendar
        minDate={cliente && dataAtualFormatada}
        onDayPress={(day) => {
          handleDayPress(day);
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            selectedColor: COLORS.primaryDark,
          },
        }}
      />
      {/* {console.log('selected')}
      {console.log(selected)} */}
      {selected !== '' && (
        <View>
          <Text style={styles.infoText}>{selectedInfo}</Text>
          {/* {console.log('selectedMarkedDate')}
          {console.log(selectedMarkedDate)}
          {console.log(cliente)} */}


          {selectedTime !== '' && (
            <View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Horário: {selectedTime}</Text>
              </View>

            </View>
          )}
          {cliente ? (
            <View style={styles.infoContainer}>
              {selectedMarkedDate ? (
                <>
                  <Texto tamanho={16} cor={COLORS.red} texto={'Data Agendada'} style={styles.infoText} />
                </>
              ) : (
                <Texto tamanho={16} cor={COLORS.green} texto={'Data sem Agendamentos'} style={styles.infoText} />
              )}

              <MeuButtonMetade borda width={'50%'} texto={selectedTime ? 'Trocar Horário' : 'Escolher Horário'} onClick={showDatePicker} />
              {reservarButton && selectedTime && (
                <MeuButtonMetade width={'auto'} texto={'Solicitar Reserva'} onClick={() => onPress(['Reservar', selected, selectedTime])} />
              )}
            </View>
          ) : (
            <View style={styles.infoContainer}>
              {selectedMarkedDate ? (
                <>
                  <Texto tamanho={16} cor={COLORS.green} texto={'Data Agendada'} style={styles.infoText} />
                  <MeuButtonMetade cor={COLORS.primaryShadow} texto={'Ver Festa'}
                    onClick={() => onPress(['VerFesta', selected, selectedTime])} style={styles.infoText} />
                </>
              ) : (
                <Texto tamanho={16} cor={COLORS.red} texto={'Data sem Agendamentos'} style={styles.infoText} />
              )}
            </View>
          )}

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
