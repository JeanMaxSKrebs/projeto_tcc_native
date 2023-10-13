import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Dia from './Dia';
import { COLORS } from '../../assets/colors';
import MeuButton from '../MeuButton';
import Texto from '../Texto';
import MeuButtonMetade from '../MeuButtonMetade';
import Sumario from './Sumario';
import { CommonActions } from '@react-navigation/native';
import { LocaleConfig } from 'react-native-calendars';
import { Calendar } from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-br';
export { LocaleConfig };


const Calendario = ({ reservas, onPress, dataReserva, horarioReserva, cliente }) => {
  const [selected, setSelected] = useState(dataReserva || '');
  const [selectedInfo, setSelectedInfo] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [tamanhoSumario, setTamanhoSumario] = useState(50);
  const [hora, setHora] = useState('');
  const [selectedTime, setSelectedTime] = useState(horarioReserva || '');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [solicitarReserva, setSolicitarReserva] = useState(false);
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
      { color: COLORS.primaryDark, label: 'Dia Selecionado' },
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
    // console.log('dia');
    // console.log(dia);
    // console.log('hora');
    // console.log(hora);

    const parsedDate = Date(`${dia}T${hora}`); // tem um T no meio nao esquecer
    // console.log('parsedDate');
    // console.log(parsedDate);


    return parsedDate;
  }


  const handleDayPress = (day) => {
    // console.log('day');
    // console.log(day);
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

  const handleDateConfirm = (hora) => {
    const date = new Date(`${selected}T${hora}`);
    setSolicitarReserva(true);

    setHora(hora);
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
        minDate={cliente ? dataAtualFormatada : ''}
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

          {selectedTime !== '' && (
            <View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Horário: {selectedTime}</Text>
              </View>

            </View>
          )}
          {console.log('cliente')}
          {console.log(cliente)}
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

              <MeuButtonMetade disabled={!solicitarReserva} width={'50%'} texto={'Solicitar Reserva'}
                cor={COLORS.primary}
                onClick={() => onPress(['Reservar', selected, selectedTime, hora])} />

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
                <>
                  <Texto tamanho={16} cor={COLORS.red} texto={'Data sem Agendamentos'} style={styles.infoText} />
                </>
              )}
              <MeuButtonMetade borda width={'50%'} texto={selectedTime ? 'Trocar Horário' : 'Escolher Horário'} onClick={showDatePicker} />


            </View>
          )}


        </View>
      )

      }

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={(dayhour) => {
          const hour = dayhour.toISOString().substr(11, 13);

          handleDateConfirm(hour);
        }}
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
