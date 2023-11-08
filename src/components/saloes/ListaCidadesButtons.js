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
        width: '90%',
        borderRadius: 5,
        backgroundColor: COLORS.primaryShadow,
        padding: 10,
    },
    button: {
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        padding: 10,
        marginHorizontal: 15,
        borderRadius: 5,
    },
});

export default ListaCidadesButtons;
