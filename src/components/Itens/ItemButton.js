import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import Texto from "../../components/Texto";
import { COLORS } from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';


const ItemButton = ({ item, onPress, direita, icone }) => {
    // console.log('item000');
    // console.log(item);

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
            {direita ?
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
                            ? (<Texto tamanho={20} texto={novoNome} />)
                            : (<Texto tamanho={20} texto={nome} />)
                        }
                        {novaDescricao
                            ? (<Texto tamanho={14} texto={novaDescricao} />)
                            : (<Texto tamanho={14} texto={descricao} />)
                        }
                        <Texto tamanho={14} texto={`Quantidade Máxima: ${quantidadeMaxima}`} />
                    </View>
                    <View style={styles.quantidade}>
                        <TouchableOpacity style={styles.areaButton} onPress={() => onPress(icone)}>
                            <View style={styles.buttonPlus}>
                                {icone === "atualizar" ? (
                                    <Texto tamanho={0} texto={<Icon name="create" color={COLORS.primary} size={35} />}></Texto>
                                ) : icone === "adicionar" ? (
                                    <Texto tamanho={0} texto={<Icon name="add" color={COLORS.primary} size={35} />}></Texto>
                                ) : (
                                    <Texto tamanho={0} texto={<Icon name="close" color={COLORS.red} size={35} />}></Texto>
                                )
                                }
                            </View>
                        </TouchableOpacity >
                    </View>
                </View>
                :
                <View style={styles.container}>
                    <View style={styles.quantidade}>
                        <TouchableOpacity style={styles.areaButton} onPress={() => onPress(icone)}>
                            <View style={styles.buttonPlus}>
                                {icone === "atualizar" ? (
                                    <Texto tamanho={0} texto={<Icon name="create" color={COLORS.primary} size={35} />}></Texto>
                                ) : icone === "adicionar" ? (
                                    <Texto tamanho={0} texto={<Icon name="add" color={COLORS.primary} size={35} />}></Texto>
                                ) : (
                                    <Texto tamanho={0} texto={<Icon name="close" color={COLORS.red} size={35} />}></Texto>
                                )
                                }
                            </View>
                        </TouchableOpacity >
                    </View>
                    <View style={styles.descricao}>
                        {novoNome
                            ? (<Texto tamanho={20} texto={novoNome} />)
                            : (<Texto tamanho={20} texto={nome} />)
                        }
                        {novaDescricao
                            ? (<Texto tamanho={14} texto={novaDescricao} />)
                            : (<Texto tamanho={14} texto={descricao} />)
                        }
                        <Texto tamanho={14} texto={`Quantidade Máxima: ${quantidadeMaxima}`} />
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
        height: 100,
        marginBottom: 5,
        alignItems: 'center',
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
        width: '50%',
        justifyContent: 'center'
    },
    quantidade: {
        width: '25%',
    },
    buttonPlus: {
        backgroundColor: COLORS.black,
        borderRadius: 15,
        width: '70%',
        aspectRatio: 1,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    areaButton: {
        // backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export default ItemButton;
