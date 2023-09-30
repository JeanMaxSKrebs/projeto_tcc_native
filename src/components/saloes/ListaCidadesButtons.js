import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';
import { View } from '../../screens/Orcamento/styles';
import Texto from '../Texto';

const ListaCidadesButtons = ({ cidades, onCityButtonClick }) => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ width: '100%' }}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onCityButtonClick('HOME')}
                >
                    <Texto tamanho={16} texto="HOME" />
                </TouchableOpacity>
                {cidades.map((cidade, index) => (
                    cidade ? <TouchableOpacity
                        key={index}
                        style={styles.button}
                        onPress={() => onCityButtonClick(cidade)}
                    >
                        <Texto tamanho={16} texto={cidade} />
                    </TouchableOpacity>
                        : null
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50, // Defina a altura desejada aqui
    },
    button: {
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.primaryShadow, // Cor de fundo do botão
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
});

export default ListaCidadesButtons;
