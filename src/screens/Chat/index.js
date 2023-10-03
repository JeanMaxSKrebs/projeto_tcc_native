import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableHighlight } from 'react-native';
import VoltarWithoutColor from '../../components/VoltarWithoutColor';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Texto from '../../components/Texto';
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import { ChatContext } from "../../context/ChatProvider";
import firestore from '@react-native-firebase/firestore';

const MessageItem = ({ message, myId }) => {
    const isSentByMe = message.sendBy === myId;
    // console.log('message');
    // console.log(message.content);
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
    const { messages, sendMessage } = useContext(ChatContext);

    const chat = route.params.chat;
    const user = route.params.user;

    // console.log('chat');
    // console.log(chat);
    // console.log('user');
    // console.log(user);
    const myId = user.id
    const youId = chat.id
    const flatListRef = useRef(null);

    const [mensagens, setMensagens] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const voltar = () => {
        navigation.goBack();
    };

    useEffect(() => {
        let unsubscribe;

        const listenerChat = async (id, to) => {
            const chatRef = firestore().doc(`chats/${id}/chat/${to}`);

            unsubscribe = chatRef.onSnapshot((chatSnapshot) => {
                console.log(`Received query snapshot of size ${chatSnapshot.size}`);

                if (chatSnapshot.exists) {
                    const chatData = chatSnapshot.data();
                    const updatedChat = {
                        id: chatRef.id,
                        nome: chatData.nome,
                        mensagens: chatData.messages.map((message) => ({
                            ...message,
                            sent: message.sent ? message.sent.toDate().toISOString() : null,
                        })),
                    };
                    console.log('updatedChat');
                    console.log(updatedChat);
                    setMensagens(updatedChat.mensagens);
                } else {
                    setMensagens(null);
                }
            })
        };
        listenerChat(myId, youId)
        
        // Retorna uma função de limpeza para desmontar o listener
        return () => {
            if (unsubscribe) {
                unsubscribe(); // Chame a função de unsubscribe aqui para parar de ouvir o snapshot
            }
        };
    }, []);

    const enviarMensagem = async () => {
        if (newMessage.trim() !== '') {
            const newMessageObject = {
                tipo: 'Salao',
                sent: myId,
                to: youId,
                newMessage: {
                    content: newMessage,
                    sendBy: myId,
                }
            };
            const updatedMensagens = [...mensagens, newMessageObject.newMessage];
            console.log('newMessageObject');
            console.log(newMessageObject);
            setMensagens(updatedMensagens);
            setNewMessage('');
            if (await sendMessage(newMessageObject)) {
                console.log('mensagem salva no banco');
            }

            // Após adicionar a nova mensagem, role para o final
            flatListRef.current.scrollToEnd();
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <VoltarWithoutColor texto="Voltar" onClick={() => voltar()} />
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
                    data={mensagens}
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
