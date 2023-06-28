import React from 'react';
import {TextInput} from 'react-native';
import styled from 'styled-components/native';

// import { Container } from './styles';

const SearchBar = ({search, name}) => {
  // console.log(search);
  // console.log(name);

  return (
    <TextInput
      color= 'black'
      placeholderTextColor="gray"
      placeholder={`Pesquise ${name}`}
      keyboardType="default"
      returnKeyType="go"
      onChangeText={t => {
        search(t);
      }}
    />
  );
};

export default SearchBar;