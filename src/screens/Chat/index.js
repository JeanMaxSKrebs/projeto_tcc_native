import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableHighlight } from 'react-native';
import VoltarWithoutColor from '../../components/VoltarWithoutColor';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Texto from '../../components/Texto';
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import { ChatContext } from "../../context/ChatProvider";

const MessageItem = ({ message, myId }) => {
    const isSentByMe = message.sendBy === myId;
    // console.log('message');
    // console.log(message);
    // console.log('message.sent');
    // console.log(message.sendBy);

    return (
        <View style={[
            styles.messageContainer,
            isSentByMe ? styles.sentByMe : styles.sentByOther
        ]}>
            <Text style={styles.messageText}>{message.content}</Text>
        </View>
    )
};

const Chat = ({ route, navigation }) => {
    const { messages, sendMessage  } = useContext(ChatContext);

    const chat = route.params.chat;
    const user = route.params.user;

    // console.log('chat');
    // console.log(chat);
    // console.log('user');
    // console.log(user);
    const myId = user.id
    const youId = chat.id
    const flatListRef = useRef(null);

    const [mensagem, setMensagem] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Carregue as mensagens iniciais do chat quando o componente for montado
        // console.log('chat.mensagens');
        // console.log(chat.mensagens);
        setMensagem(chat.mensagens);
    }, [chat]);

    const enviarMensagem = () => {
        if (newMessage.trim() !== '') {
            const newMessageObject = {
                content: newMessage,
                sent: new Date().toISOString(), // Obtenha a data e hora atual no formato ISO
                sentBy: myId,
            };
            const updatedMessages = [...messages, newMessageObject];

            sendMessage()
            setMensagem(updatedMessages);
            setNewMessage('');

            // Após adicionar a nova mensagem, role para o final
            flatListRef.current.scrollToEnd();
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <VoltarWithoutColor texto="Voltar" onClick={() => navigation.goBack()} />
            </View>
            <View style={{ flexDirection: 'row', margin: 20 }}>
                <View style={{}} >
                    <Icon name="person-circle-outline" size={60} color="black" />
                </View>
                <View style={{ padding: 20 }} >
                    <Texto tamanho={18} texto={chat.nome} />
                </View>
            </View>
            <View style={styles.messageList}>
                {/* {console.log('messages')}
                {console.log(messages)}
                {console.log('mensagem')}
                {console.log(mensagem)} */}
                <AutoScrollFlatList
                    ref={flatListRef}
                    style={{ marginBottom: 100 }}
                    data={mensagem}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <MessageItem message={item} myId={myId} />}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua mensagem"
                    value={newMessage}
                    onChangeText={(text) => setNewMessage(text)}
                />
                <TouchableHighlight style={styles.button} onPress={enviarMensagem}>
                    <Icon name="send" size={30} color="black" />
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default Chat;
