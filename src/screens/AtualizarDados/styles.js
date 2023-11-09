import styled from 'styled-components/native';
import { COLORS } from '../../assets/colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 20px;
`;

export const TextPlaceholder = styled.Text`
  /* background-color: red; */
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
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  font-size: 25px;
`;
