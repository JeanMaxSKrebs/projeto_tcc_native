import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableHighlight } from 'react-native';
import VoltarWithoutColor from '../../components/VoltarWithoutColor';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Texto from '../../components/Texto';
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";


const MessageItem = ({ message, myId }) => {
    const isSentByMe = message.sentBy === myId;
    // console.log('message'),
    // console.log(message),
    // console.log('message.sent');
    // console.log(message.sentBy);

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
    const chat = route.params.chat;
    const myId = chat.users[0].id
    const youId = chat.users[1].id
    const flatListRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Carregue as mensagens iniciais do chat quando o componente for montado
        setMessages(chat.messages);
    }, [chat]);

    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            const updatedMessages = [...messages, { text: newMessage, user: 'Me' }];
            setMessages(updatedMessages);
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
                    <Texto tamanho={18} texto={chat.users[1].nome} />
                </View>
            </View>
            <View style={styles.messageList}>
                {console.log('messages')}
                {console.log(messages.length)}
                <AutoScrollFlatList
                    ref={flatListRef}
                    style={{ marginBottom: 100 }}
                    data={messages}
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
                <TouchableHighlight style={styles.button} onPress={sendMessage}>
                    <Icon name="send" size={30} color="black" />
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default Chat;
