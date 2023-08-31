import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { SalaoContext } from '../../context/SalaoProvider';
import Voltar from '../../components/Voltar';

const Itens = ({ route, navigation }) => {
  const { itens, getItensData } = useContext(SalaoContext);
  // const [itens, setItens] = useState([]);

  const voltar = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log('entrou itens');
    // console.log(route.params);
    // console.log(route.params.salao);
    // console.log(route.params.orcamento);
    // console.log(itens);
    // console.log(itens);
    getItensData(route.params.salao.id)
  }, []);

  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <View>
        <View>
          <Text>Itens Screen</Text>
          {/* Renderize os itens aqui */}
          {console.log('itens screen')}
          {console.log(itens)}
          {itens.map(item => (
            <View key={item.id}>
              <Text>{item.nome}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Itens;
