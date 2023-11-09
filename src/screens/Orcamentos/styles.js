import styled from 'styled-components/native';
import { COLORS } from '../../assets/colors';

export const View = styled.View`
    align-items: center;
    justify-content: center;
    width: 100%;
    `;
    export const Container = styled.View`
    width: 80%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${COLORS.secundary};
    border-radius: 15px;
    `;
export const Content = styled.View`
  align-items: center; 
  padding: 10% 0;
  width: 100%;
  
  `;

export const FlatList = styled.FlatList`
  // background-color: ${COLORS.gray};
  color: black;
  `;

export const Button = styled.TouchableOpacity`
    width: 100%;
    text-align: center;
    padding: 10px;
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
