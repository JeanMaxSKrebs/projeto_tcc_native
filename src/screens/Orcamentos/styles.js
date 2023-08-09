import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const View = styled.SafeAreaView`
    color: black;
    font-size: 30px;
    align-items: center; 
    width: 100%;
    /* background-color: red; */
    `;
export const Container = styled.SafeAreaView`
    color: ${COLORS.primary};
    width: 80%;
    height: 90%;
    background-color: ${COLORS.secundary};
    justify-items: center;
    border-radius: 15px;
    `;
export const Content = styled.SafeAreaView`
  align-items: center; 
  /* background-color: ${COLORS.primaryDark}; */
  padding: 10% 0;
  `;

export const FlatList = styled.FlatList`
  /* background-color: ${COLORS.gray}; */
  color: black;
  `;

export const Button = styled.TouchableOpacity`
    width: 80%;
    text-align: center;
    padding: 5px;
    margin: 10px;
    justify-items: center;
    align-self: center;
    background-color: ${COLORS.background};

    /* Border styling */
    border-radius: 15px;
    border-width: 2px;
    /* border-color: ${COLORS.black}; */
    border-style: solid;
  `;
