import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import Texto from "../../components/Texto";
import { COLORS } from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';


const ItemButton = ({ item, onPress, direita, icone, isItensSaloes }) => {
    // console.log('item000');
    // console.log(item);
    console.log('isItensSaloes');
    console.log(isItensSaloes);
    // console.log(item.quantidadeMaxima);

    const [quantidade, setQuantidade] = useState(item.quantidade);
    const [quantidadeMaxima, setQuantidadeMaxima] = useState(item.quantidadeMaxima);

    const [nome, setNome] = useState(item.itens.nome);
    const [descricao, setDescricao] = useState(item.itens.descricao);
    const [imagem, setImagem] = useState(item.itens.imagem);

    const [novoNome, setNovoNome] = useState(item.novoNome);
    const [novaDescricao, setNovaDescricao] = useState(item.novaDescricao);
    const [novaImagem, setNovaImagem] = useState(item.novaImagem);

    return (
        <View>
            {direita
                ?
                <View style={styles.container}>
                    {novaImagem !== undefined && novaImagem !== null
                        ? (<Image
                            style={styles.image}
                            source={{ uri: novaImagem }}
                            resizeMode="cover"
                        />)
                        : (<Image
                            style={styles.image}
                            source={{ uri: imagem }}
                            resizeMode="cover"
                        />)
                    }
                    <View style={styles.descricao}>
                        {novoNome
                            ? (<Texto tamanho={22} texto={novoNome} />)
                            : (<Texto tamanho={22} texto={nome} />)
                        }
                        {novaDescricao
                            ? (<Texto tamanho={18} texto={novaDescricao} />)
                            : (<Texto tamanho={18} texto={descricao} />)
                        }
                        {isItensSaloes
                            ? <View>
                                <Texto tamanho={18} texto={`Quantidade Máxima: ${quantidadeMaxima}`} />
                            </View>
                            :
                            <View>
                                <Texto tamanho={18} texto={`Quantidade Disponibilizada: ${quantidade}`} />
                                <Texto tamanho={14} texto={`Quantidade Máxima: ${quantidadeMaxima}`} />
                            </View>
                        }
                    </View>
                </View>
                :
                <View style={styles.container}>
                    <View style={styles.descricao}>
                        {novoNome
                            ? (<Texto tamanho={22} texto={novoNome} />)
                            : (<Texto tamanho={22} texto={nome} />)
                        }
                        {novaDescricao
                            ? (<Texto tamanho={18} texto={novaDescricao} />)
                            : (<Texto tamanho={18} texto={descricao} />)
                        }
                        {isItensSaloes
                            ? <View>
                                <Texto tamanho={18} texto={`Quantidade Máxima: ${quantidadeMaxima}`} />
                            </View>
                            :
                            <View>
                                <Texto tamanho={18} texto={`Quantidade Disponibilizada: ${quantidade}`} />
                                <Texto tamanho={14} texto={`Quantidade Máxima: ${quantidadeMaxima}`} />
                            </View>
                        }
                    </View>
                    {novaImagem !== undefined && novaImagem !== null
                        ? (<Image
                            style={styles.image}
                            source={{ uri: novaImagem }}
                            resizeMode="cover"
                        />)
                        : (<Image
                            style={styles.image}
                            source={{ uri: imagem }}
                            resizeMode="cover"
                        />)
                    }
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 15,
        borderColor: COLORS.secundary,
        width: '100%',
        marginBottom: 5,
        alignItems: 'center',
        backgroundColor: COLORS.background
    },
    image: {
        // borderWidth: 2,
        // borderRadius: 15,
        // borderColor: COLORS.secundary,
        width: '25%',
        aspectRatio: 1,
        marginRight: 5,
    },
    descricao: {
        margin: 10,
        padding: 10,
    },

});

export default ItemButton;
