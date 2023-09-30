import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { ChatContext } from '../../context/ChatProvider';
import Voltar from '../../components/Voltar';

const Chat = ({ route, navigation }) => {
    const [messages] = useState(ChatContext);
    const [mensagem, setMensagem] = useState('');
    const [newMessage, setNewMessage] = useState('');

    const salao = route.params.salao;

    useEffect(() => {
        // Use o valor de "salao" conforme necessário
        console.log('Salão:', salao);
    }, [salao]);

    const voltar = () => {
        navigation.goBack();
    };

    // Função para adicionar uma nova mensagem à lista de mensagens
    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            const updatedMessages = [...mensagem, { text: newMessage, user: 'Me' }];
            setMensagem(updatedMessages);
            setNewMessage('');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View>
                <Voltar texto="Voltar" onClick={() => voltar()} />
            </View>
            <View>
                <FlatList
                    data={mensagem}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ padding: 10 }}>
                            <Text>{item.user}: {item.text}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    style={{ flex: 1, borderWidth: 1, borderColor: 'gray', margin: 10, padding: 10 }}
                    placeholder="Digite sua mensagem"
                    value={newMessage}
                    onChangeText={(text) => setNewMessage(text)}
                />
                <Button title="Enviar" onPress={sendMessage} />
            </View>
        </View>
    );
}

export default Chat;
