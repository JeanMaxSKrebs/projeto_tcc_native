import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Text, TouchableOpacity } from 'react-native';
import SearchBar from '../../components/SearchBar';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { chats } from './script';
import Item from './Item'
import {CommonActions} from '@react-navigation/native';
import { ChatContext } from "../../context/ChatProvider";


const Chats = ({ route, navigation }) => {
    const { messages, fetchMessages  } = useContext(ChatContext);
    const [chatTemp, setChatTemp] = useState([]);

    const user = route.params.user;

    const voltar = () => {
        navigation.goBack();
    };

    useEffect(() => {
        // console.log('user');
        // console.log(user.id);
        fetchMessages(user.id)

      }, []);

    const filterCliente = text => {
        // console.log(text);
        let filtro = [];
        chats.filter(chat => {
            if (chat.users[1].nome.toLowerCase().includes(text.toLowerCase())) {
                filtro.push(chat);
            }
        });
        // console.log('filtro');
        // console.log(filtro);
        // console.log(filtro.length);
        if (filtro.length > 0) {
            setChatTemp(filtro);
            // console.log(filtro.length);
        } else {
            setChatTemp([]);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <Item item={item} onPress={() => routeChat(item)} />
        );
    };

    const routeChat = (item) => {
        // console.log(item);
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Chat',
                params: { chat: item, user: user },
            })
        );
    };

    return (
        <SafeAreaView>
            <View>
                <Voltar texto="Voltar" onClick={() => voltar()} />
            </View>
            <Texto tamanho={35} texto={'Chats'}></Texto>
            <SearchBar search={filterCliente} name={'Cliente'} />
            {console.log('messages')}
            {console.log(messages)}
            {/* {console.log(chats[0].users)}
            {console.log(chats[0].messages)}
            {console.log(chats[1].users)} */}
            {/* {console.log('chatTemp')}
            {console.log(chatTemp)}
            {console.log(chatTemp.length)} */}
            <FlatList
                data={chatTemp.length > 0 ? chatTemp : messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
};

export default Chats;
