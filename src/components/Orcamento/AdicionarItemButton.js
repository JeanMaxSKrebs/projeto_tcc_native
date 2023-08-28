import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import Texto from '../Texto';

const AlterarOrcamentoButton = props => {
  // console.log(props.item);
  return (
    <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
      <View style={styles.content}>
        <View style={styles.area}>
          <Texto style={styles.item} tamanho={25} texto={'Adicionar Item / Utensílio'}></Texto>
        </View>
        <View style={styles.areaButton}>
          <View style={styles.buttonPlus}>
            <Texto tamanho={40} texto={'+'}></Texto>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default AlterarOrcamentoButton;

const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
    color: COLORS.secundary,
  },
  buttonPlus: {
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    borderRadius: 15,
  },
  button: {
    height: 70,
    width: '80%',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row', // Alteração para alinhar áreas lado a lado
    height: '100%',
    width: '100%',
  },
  areaButton: {
    flex: 0.15,
    justifyContent: 'center',
    height: '100%',
    paddingLeft: 20,
    // backgroundColor:COLORS.primary
  },
  area: {
    flex: 0.85, // flex para determinar a proporção
    justifyContent: 'center',
    height: '100%',
    borderColor:COLORS.primary
  },
});
