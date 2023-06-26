/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item.js';
import AddFloatButton from '../../components/AddFloatButton';
import Loading from '../../components/Loading';
import {EstantesContext} from '../../context/EstantesProvider';

const Companies = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {getCompanies, companies} = useContext(EstantesContext);

  const fetchData = async () => {
    await getCompanies(); //busca as companies via API
    setLoading(false);
  };

  useEffect(() => {
    fetchData(); //busca as companies
  }, []);

  useEffect(() => {
    //console.log(companies);
    setData(companies);
  }, [companies]);

  const routeCompany = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Empresa',
        params: {company: item},
      }),
    );
  };

  const routeAddCompany = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Empresa',
        params: {company: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeCompany(item)} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddCompany} />
      {loading && <Loading />}
    </Container>
  );
};
export default Companies;
