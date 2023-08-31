import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';

const AlterarOrcamento = props => {
  // console.log(props);
  return (
    <View style={styles.content}>
      <View style={styles.area}>
        <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
          <Text style={styles.texto}>Alterar &gt; </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default AlterarOrcamento;

const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
    color: COLORS.secundary
  },
  content: {
    borderColor: 'black', // Cor da borda
    borderWidth: 10, // Espessura da borda
    justifyContent: 'center',
    height: 100,
    paddingRight: 10 // Espessura da borda
},
area: {
    height: '100%',
    width: '100%',
    borderColor: 'red', // Cor da borda
    borderWidth: 10, // Espessura da borda
    // paddingRight: 10 // Espessura da borda
  },
  button: {
    borderColor: 'black', // Cor da borda
    borderWidth: 2, // Espessura da borda
    height: 50,
    width: '30%',
    justifyContent: 'center',
    paddingRight: 20
  },
});
