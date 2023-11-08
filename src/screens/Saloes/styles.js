import styled from 'styled-components/native';
import { COLORS } from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  width: 100%;
`;

export const FlatList = styled.FlatList`
  width: 80%;
  height: 100%;
`;

export const ContainerTitle = styled.View`
  border: 2px;
  border-radius: 15px;
  width: 80%;
  background-color: ${COLORS.primaryShadow}
  margin: 15px
`;
