import React from 'react';
import { Container, ChatItem, ChatImage, ChatNome, ChatMensagem, ChatTexto, ChatHora } from './styles';
import Texto from '../../components/Texto';
import Icon from 'react-native-vector-icons/Ionicons';

const Item = ({ item, onPress }) => {
    return (
        <Container>
            {/* {console.log('item')}
            {console.log(item)} */}
            <ChatItem onPress={onPress}>
                <ChatImage>
                    <Icon name="person-circle-outline" size={60} color="black" />
                </ChatImage>
                <ChatTexto>
                    <ChatNome>
                        <Texto tamanho={18} texto={item.users[1].nome} />
                    </ChatNome>
                    <ChatMensagem>
                        <Texto tamanho={16} texto={item.messages[0].content} />
                    </ChatMensagem>
                </ChatTexto>
                <ChatHora>
                    <Texto tamanho={10} texto={item.messages[0].sent} />
                </ChatHora>
            </ChatItem>
        </Container>
    )
}

export default Item;
