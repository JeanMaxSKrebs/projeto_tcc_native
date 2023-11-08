import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const TextInput = styled.TextInput`
  width: 95%;
  height: 50px;
  border-bottom-width: 2px;
  font-size: 16px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 10px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  // background-color: ${COLORS.terciary};
`;

export const ContainerImage = styled.View`
  color: black;
  margin: 20px;
  padding: 10px;
  background-color: ${COLORS.secundary};
  text-align: center;
  align-items: center;
  width: 90%;
  height: 300px;
  justify-content: center;
`;

export const FlatList = styled.FlatList`
  width: 80%;
  height: 100%;
`;
