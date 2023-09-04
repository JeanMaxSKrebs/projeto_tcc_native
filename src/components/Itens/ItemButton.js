import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import Texto from "../../components/Texto";
import { COLORS } from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';


const ItemButton = ({ item, onPress, direita }) => {
    return (
        <View>
            {direita ?
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{ uri: item.imagem }}
                        resizeMode="cover"
                    />
                    <View style={styles.descricao}>
                        <Texto tamanho={20} texto={item.nome} />
                        <Texto tamanho={14} texto={item.descricao} />
                        <Texto tamanho={14} texto={`Quantidade Máxima: ${item.quantidadeMaxima}`} />
                    </View>
                    <View style={styles.quantidade}>
                        <TouchableOpacity style={styles.areaButton} onPress={onPress}>
                            <View style={styles.buttonPlus}>
                                <Texto tamanho={0} texto={<Icon name="create" color={COLORS.primaryDark} size={35} />} cor={COLORS.primary}></Texto>
                            </View>
                        </TouchableOpacity >
                    </View>
                </View>
                :
                <View style={styles.container}>
                    <View style={styles.quantidade}>
                        <TouchableOpacity style={styles.areaButton} onPress={onPress}>
                            <View style={styles.buttonPlus}>
                                <Texto tamanho={0} texto={<Icon name="create" color={COLORS.primaryDark} size={35} />} cor={COLORS.primary}></Texto>
                            </View>
                        </TouchableOpacity >
                    </View>
                    <View style={styles.descricao}>
                        <Texto tamanho={20} texto={item.nome} />
                        <Texto tamanho={14} texto={item.descricao} />
                        <Texto tamanho={14} texto={`Quantidade Máxima: ${item.quantidadeMaxima}`} />
                    </View>
                    <Image
                        style={styles.image}
                        source={{ uri: item.imagem }}
                        resizeMode="cover"
                    />
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
