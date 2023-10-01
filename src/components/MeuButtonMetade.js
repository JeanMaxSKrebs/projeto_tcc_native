import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import { COLORS } from '../assets/colors';

const MeuButtonMetade = props => {
  // console.log(props);
  return (
    <TouchableHighlight style={[styles.button, , { width: props.width }]} onPress={() => props.onClick()}>
      <Text style={styles.texto}>{props.texto}</Text>
    </TouchableHighlight>
  );
};

export default MeuButtonMetade;

const styles = StyleSheet.create({
  texto: {
    fontSize: 18,
    color: COLORS.secundary,
    textAlign: 'center',
  },
  button: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
