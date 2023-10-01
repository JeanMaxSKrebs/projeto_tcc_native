import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { COLORS } from '../../assets/colors';
import Texto from '../../components/Texto';
import { CommonActions } from '@react-navigation/native';

const Agendar = ({ route, navigation }) => {
    // Defina os estados necessários para a agenda
    const [events, setEvents] = useState([]); // Para armazenar eventos da agenda
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');

    // Função para adicionar um evento à agenda
    const addEvent = () => {
        // Verifique se todos os campos estão preenchidos
        if (eventName && eventDate && eventTime) {
            // Crie um novo evento com os dados fornecidos
            const newEvent = {
                name: eventName,
                date: eventDate,
                time: eventTime,
            };

            // Adicione o novo evento à lista de eventos
            setEvents([...events, newEvent]);

            // Limpe os campos após adicionar o evento
            setEventName('');
            setEventDate('');
            setEventTime('');
        }
    };

    // Função para voltar à tela anterior
    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Texto style={styles.texto} tamanho={40} cor={COLORS.secundary} texto={'Agenda'} />
            <Text style={styles.textoMenor}>Adicione eventos à agenda:</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do Evento"
                value={eventName}
                onChangeText={(text) => setEventName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Data do Evento"
                value={eventDate}
                onChangeText={(text) => setEventDate(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Hora do Evento"
                value={eventTime}
                onChangeText={(text) => setEventTime(text)}
            />

            <Button title="Adicionar Evento" onPress={addEvent} />

            {/* Lista de eventos na agenda */}
            <View>
                {events.map((event, index) => (
                    <View key={index}>
                        <Texto tamanho={20} texto={`Evento: ${event.name}, Data: ${event.date}, Hora: ${event.time}`} />
                    </View>
                ))}
            </View>

            <Button title="Voltar" onPress={goBack} />
        </View>
    );
};

export default Agendar;

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
