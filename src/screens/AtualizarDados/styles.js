import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 20px;
`;

export const TextPlaceholder = styled.Text`
  /* background-color: red; */
  text-align: left;
  font-size: 10px;
  margin-bottom: 1px;
  color: gray;
`;

export const TextInput = styled.TextInput`
  color: black;
  width: 70%;
  height: 50px;
  border-width: 2px;
  border-radius: 15px;
  font-size: 16px;
  text-align: center;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 10px;

`;

export const Text = styled.Text`
  font-size: 25px;
`;
