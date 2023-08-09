/* eslint-disable react/no-unstable-nested-components */
import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import MeuButton from '../../components/MeuButton';
import {Button} from './styles';
import Texto from "../../components/Texto";

const Item = ({item, onPress}) => {

    return (
    <Button  onPress={onPress}>
    {console.log('item123')}
    {console.log(item)}
      <Texto tamanho={20} texto={item.nome} cor={COLORS.black}/>
      <Texto tamanho={15} texto={`Descrição: ${item.descricao}`}/>

    </Button>
    );
};

 export default Item;
