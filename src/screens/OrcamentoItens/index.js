import React, {useEffect, useContext, useState} from 'react';
import { OrcamentosContext } from '../../context/OrcamentosProvider';
import {Container, FlatList, Content, TextInput, View} from './styles';

const renderItem = ({ item }) => {
  // console.log('item:', item);
  // console.log('item.uid:', item.uid);
  
  return (
    <Item item={item} onPress={() => routeOrcamentosItens(item)} />
  );
};

const OrcamentoItens = ({route, navigation}) => {
  const {orcamentosItens, getHallsData} = useContext(OrcamentosContext);
  const [orcamentosItensTemp, setOrcamentosItensTemp] = useState([]);

  return (
    <Container>
      {/* {console.log('saloes')}
      {console.log(saloes)} */}
      {/* {console.log('saloesTemp')}
      {console.log(saloesTemp.length)} */}

      <FlatList
        data={orcamentosItensTemp.length > 0 ? orcamentosItensTemp : orcamentosItens}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
    </Container>
  );
};

export default OrcamentoItens;

