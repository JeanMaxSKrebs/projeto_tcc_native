import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import Texto from '../Texto';

const AlterarOrcamentoButton = props => {
  // console.log(props.item);
  return (
    <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
      <View style={styles.content}>
        <View style={styles.areaNome}>
          <Texto style={styles.item} tamanho={25} texto={props.item.nome}></Texto>
        </View>
        <View style={styles.areaValor}>
          <View>
            <Texto tamanho={15} texto={'Valor Base: '}></Texto>
            <Texto tamanho={25} texto={'R$ ' + props.item.valorBase}></Texto>
          </View>
          <View>
            <Texto tamanho={15} texto={'Valor Total: '}></Texto>
            <Texto tamanho={25} texto={'R$ ' + props.item.valorTotal}></Texto>
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
  button: {
    borderColor: COLORS.primary,
    borderWidth: 5,
    justifyContent: 'center',
    height: 150,
    width: '90%',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row', // Alteração para alinhar áreas lado a lado
    // borderColor: 'black',
    // borderWidth: 2,
    height: '100%',
    width: '100%',
  },
  areaNome: {
    flex: 0.65, // flex para determinar a proporção
    justifyContent: 'center',
    height: '100%',
    // borderColor: COLORS.primary,
    borderColor: 'black',
    borderRightWidth: 2,
  },
  areaValor: {
    flex: 0.35, // flex para determinar a proporção
    justifyContent: 'center',
    height: '100%',
    borderColor:COLORS.primary
  },
});
