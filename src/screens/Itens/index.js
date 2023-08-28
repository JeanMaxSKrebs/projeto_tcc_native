import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {SalaoContext} from '../../context/SalaoProvider';
import Voltar from '../../components/Voltar';

const Itens = ({route, navigation}) => {
  const {itens, getItensData} = useContext(SalaoContext);
  // const [itens, setItens] = useState([]);

  const voltar = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log('entrou itens');
    // console.log(route.params);
    // console.log(route.params.salao);
    // console.log(itens);
    // console.log(itens);
    getItensData(route.params.salao.id)
  }, []);
  
  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <View>
        <Text>Itens Screen</Text>
        {/* Renderize os itens aqui */}
        {console.log('itens')}
        {console.log(itens)}
        {itens.map(
          item => (
            (<Text key={item.id}>{item.nome}</Text>),
            {
              /* Substitua 'item.id' e 'item.nome' pelos campos reais do seu item */
            }
          ),
        )}
      </View>
    </SafeAreaView>
  );
};

export default Itens;
