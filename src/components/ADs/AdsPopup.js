import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const AdsPopup = ({ adsData }) => {


  return (
    <View style={styles.container}>
      {console.log('adsData')}
      {console.log(adsData)}
      <Image
        source={{ uri: adsData.image }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Anúncios</Text>
        <Text>{adsData.title}</Text>
        <Text>{adsData.description}</Text>
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 75,
    borderRadius: 15,
  },
});

export default AdsPopup;
