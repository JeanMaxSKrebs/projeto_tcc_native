import React from 'react';
import { View, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

// import { Container } from './styles';

const SearchBar = ({ search, name, logo }) => {
  // console.log(search);
  // console.log('name');
  // console.log(name);


  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
      {console.log('logo')}
      {console.log(logo)}
      {name === 'Salões' ?
        (logo
          ?
          <View style={{ width: 75, height: 75 }}>
            <Image source={{ uri: logo }} style={{ width: 75, height: 75}}
              onError={() => console.log('Image failed to load')}
            />
          </View>
          : <Icon name="person-circle-outline" size={60} color="black" />
        )
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