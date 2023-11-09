import styled from 'styled-components/native';
import { COLORS } from '../../assets/colors';
//
export const View = styled.SafeAreaView`
    color: black;
    font-size: 30px;
    align-items: center; 
    width: 100%;
    /* background-color: red; */
    `;
export const Container = styled.SafeAreaView`
  padding: 1px;
  align-items: center;
  width: 100%;
  height: 400px;
`;

export const Content = styled.View`
  align-items: center; 
  background-color: ${COLORS.primaryShadow};
  padding: 5px;
  border-radius: 15px;
  border-width: 2px;
  border-color: ${COLORS.gray};
`;

export const FlatList = styled.FlatList`
  /* background-color: ${COLORS.gray}; */
  color: black;
  width: 90%;
  height: 100%;
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

export const TextPlaceholder = styled.Text`
  text-align: left;
  font-size: 16px;
  margin-bottom: 2px;
  color: ${COLORS.secundary};
`;

export const TextInput = styled.TextInput`
  color: ${COLORS.secundary};
  width: 70%;
  height: 50px;
  border-width: 1px;
  border-radius: 15px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

export const ViewInput = styled.SafeAreaView`
  color: black;
  font-size: 30px;
  align-items: center; 
  width: 100%;
  /* background-color: red; */
`;