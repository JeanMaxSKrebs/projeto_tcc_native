import React from 'react';
import {TextInput} from 'react-native';
import styled from 'styled-components/native';

// import { Container } from './styles';

const SearchBar = ({search}) => {
  return (
    <TextInput
      placeholder="Pesquise livros"
      keyboardType="default"
      returnKeyType="go"
      onChangeText={t => {
        search(t);
      }}
    />
  );
};

export default SearchBar;
