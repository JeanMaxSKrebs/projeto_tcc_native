import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import Texto from "../../components/Texto";
import { COLORS } from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';


const ItemButton = ({ item, onPress, direita, icone, isItensSaloes }) => {
    // console.log('item000');
    // console.log(item);
    // console.log(isItensSaloes);
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
                    <View style={styles.contentImage}>
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

                    <View style={styles.descricao}>
                        {novoNome
                            ? (<Texto tamanho={18} texto={novoNome} />)
                            : (<Texto tamanho={18} texto={nome} />)
                        }
                        {novaDescricao
                            ? (<Texto tamanho={14} texto={novaDescricao} />)
                            : (<Texto tamanho={14} texto={descricao} />)
                        }
                        {/* {tabela === 'ItensSaloes'
                            ? (<Texto tamanho={14} texto={`Quantidade Máxima: ${quantidadeMaxima}`} />)
                            : (<Texto tamanho={14} texto={`Quantidade Máxima: ${quantidade}`} />)
                        } */}
                        {isItensSaloes
                            ? <View>
                                <Texto tamanho={14} texto={`Quantidade Máxima: ${quantidadeMaxima}`} />
                            </View>
                            :
                            <View>
                                <Texto tamanho={12} texto={`Quantidade Disponibilizada: ${quantidade}`} />
                                <Texto tamanho={14} texto={`Quantidade Máxima: ${quantidadeMaxima}`} />
                            </View>
                        }
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
                            ? (<Texto tamanho={18} texto={novoNome} />)
                            : (<Texto tamanho={18} texto={nome} />)
                        }
                        {novaDescricao
                            ? (<Texto tamanho={14} texto={novaDescricao} />)
                            : (<Texto tamanho={14} texto={descricao} />)
                        }
                        {isItensSaloes
                            ? <View>
                                <Texto tamanho={14} texto={`Quantidade Máxima: ${quantidadeMaxima}`} />
                            </View>
                            :
                            <View>
                                <Texto tamanho={12} texto={`Quantidade Disponibilizada: ${quantidade}`} />
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
        height: 100,
        marginBottom: 5,
        alignItems: 'center',
    },
    contentImage: {
        margin: 5,
        width: '25%',
        borderRadius: 15,
        alignItems: 'center',
    },
    image: {
        height: 80,
        aspectRatio: 1,
        borderRadius: 15,
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
