import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

// import { Container } from './styles';

const SearchBar = ({ search, name }) => {
  // console.log(search);
  // console.log('name');
  // console.log(name);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
      {name === 'Salões' ?
        <Icon name="person-circle-outline" size={60} color="black" />
        : null}
      <TextInput
        style={{ flex: 1, color: 'black', marginLeft: 60 }}
        placeholderTextColor="gray"
        placeholder={`Pesquise ${name}`}
        keyboardType="default"
        returnKeyType="go"
        onChangeText={(t) => {
          search(t);
        }}
      />
    </View>
  );
};

export default SearchBar;