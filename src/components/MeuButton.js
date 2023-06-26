import React from 'react';
import {Text, TouchableHighlight, StyleSheet} from 'react-native';
import {COLORS} from '../assets/colors';

const MeuButton = props => {
  console.log(props);
  return (
    <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
      <Text style={styles.texto}>{props.texto}</Text>
    </TouchableHighlight>
  );
};

export default MeuButton;

const styles = StyleSheet.create({
  texto: {
    fontSize: 25,
    color: COLORS.primary,
  },
  button: {
    top: 10,
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDark,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
