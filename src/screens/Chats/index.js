import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Text, TouchableOpacity } from 'react-native';
import SearchBar from '../../components/SearchBar';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { chats } from './script';
import Item from './Item'
import { CommonActions } from '@react-navigation/native';
import { ChatContext } from "../../context/ChatProvider";
import Loading from '../../components/Loading';
import firestore from '@react-native-firebase/firestore';
import MeuButtonMetade from '../../components/MeuButtonMetade';
import { useFocusEffect } from '@react-navigation/native'; // Importe useFocusEffect
import { Container } from './styles';
import Icon from 'react-native-vector-icons/Ionicons';


const Chats = ({ route, navigation }) => {
    const { messages, fetchMessages } = useContext(ChatContext);
    const [chats, setChats] = useState([]);
    const [chatsTemp, setChatsTemp] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const user = route.params.user;
    const cliente = route.params.cliente;
    const salao = route.params.salao;

    const voltar = () => {
        navigation.goBack();
    };

    useEffect(() => {

        carregarMensagens();
    }, []);

    const [hasFocused, setHasFocused] = useState(false);
    useFocusEffect(() => {
        // console.log(hasFocused);
        if (!hasFocused) {

            // console.log('user');
            // console.log(user);
            carregarMensagens();
            setHasFocused(true);
        }
    });

    const carregarMensagens = async () => {
        setIsLoading(true);

        if (cliente) {
            await fetchMessages(salao.id);
        } else {
            await fetchMessages(user.id);
        }
        setIsLoading(false);

        setChats(messages);

    };

    const filterCliente = text => {
        // console.log(text);
        let filtro = [];
        chats.filter(chat => {
            if (messages.nome.toLowerCase().includes(text.toLowerCase())) {
                filtro.push(chat);
            }
        });
        // console.log('filtro');
        // console.log(filtro);
        // console.log(filtro.length);
        if (filtro.length > 0) {
            setChatsTemp(filtro);
            // console.log(filtro.length);
        } else {
            setChatsTemp([]);
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
            <Container>
                <MeuButtonMetade
                    texto={<Icon size={20} name="refresh"></Icon>}
                    onClick={carregarMensagens}
                />
                <Texto tamanho={35} texto={'Chats'}></Texto>
            </Container>
            <SearchBar search={filterCliente} name={'Cliente'} />

            {/* {console.log(chats[0].users)}
            {console.log(chats[0].messages)}
            {console.log(chats[1].users)} */}
            {/* {console.log('chatTemp')}
            {console.log(chatTemp)}
            {console.log(chatTemp.length)} */}
            {isLoading ? (
                <Loading />
            ) : (
                console.log('messages123'),
                console.log(messages),
                console.log(chats),
                // console.log(messages[0].mensagens[0].content),
                <FlatList
                    data={chatsTemp.length > 0 ? chatsTemp : chats}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            )}
        </SafeAreaView>
    );
};

export default Chats;
