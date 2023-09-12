import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import { ToastAndroid } from 'react-native';

import MeuButton from '../../components/MeuButton';
import Voltar from '../../components/Voltar';
import Texto from '../../components/Texto';
import { View, Container, FlatList, Content, TextInput } from './styles';
import { OrcamentosContext } from '../../context/OrcamentosProvider';
import { CommonActions } from '@react-navigation/native';
import { ItensSaloesContext } from '../../context/ItensSaloesProvider';
import { Picker } from '@react-native-picker/picker';

const AdicionarItemSalao = ({ route, navigation }) => {
  const [valorUnitario, setValorUnitario] = useState(0);
  const [quantidadeMaxima, setQuantidadeMaxima] = useState(0);
  const [novoNome, setNovoNome] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novaImagem, setNovaImagem] = useState('');

  const { insertItemItensSaloes } = useContext(ItensSaloesContext);

  const definicao = 1000
  const valoresDe0aDefinicao = Array.from({ length: definicao + 1 }, (_, index) => index.toString());
  1
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const voltar = () => {
    navigation.goBack();
  };
  console.log('NovoItemSalao')
  // console.log('route')
  // console.log(route)
  // console.log(route.params.salao)
  let salao = route.params.salao

  const salvar = async () => {
    const itemSalao = {
      salaoId: salao.id,
      novoNome: novoNome,
      novaDescricao: novaDescricao,
      valorUnitario: parseFloat(valorUnitario), // Converte o valor para número (se necessário)
      quantidadeMaxima: parseFloat(quantidadeMaxima),
    };

    try {
      // Chame a função para inserir o novo itemSalao
      const itemSalaoId = await insertItemItensSaloes(itemSalao);

      // Crie um objeto com o ID atribuído ao novo itemSalao
      const itemSalaoComId = { ...itemSalao, id: itemSalaoId };

      // Navegue para a tela de orçamento com os dados do novo itemSalao
      navigation.dispatch(
        CommonActions.navigate({
          name: 'ItensSaloes',
          params: { salao: salao },
        }),
      );
    } catch (error) {
      console.error('Erro ao salvar o itemSalao:', error);
    }
  };


  return (
    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <View>
        <View>
          <Texto tamanho={40} texto={'NOVO ITEM'}></Texto>
        </View>
        <View>
          <TextInput
            placeholder="Nome"
            value={novoNome}
            onChangeText={setNovoNome}
          />
          <TextInput
            placeholder="Descrição"
            value={novaDescricao}
            onChangeText={setNovaDescricao}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Valor Unitário"
            value={valorUnitario}
            onChangeText={setValorUnitario}
          />
          <TextInput
            value={quantidadeMaxima.toString()}
            onChangeText={(text) => {
              if (text > definicao) {
                showToast(`Quantidade Máxima de Itens: ${definicao}`);
                setQuantidadeMaxima(quantidadeMaxima);
              } else {
                setQuantidadeMaxima(text)
              }
            }}
            keyboardType="numeric"
          />
          <Picker style={{ width: 120, height: 50 }}
            selectedValue={quantidadeMaxima}
            onValueChange={(item, index) => {
              setQuantidadeMaxima(item);
            }}
          >
            {valoresDe0aDefinicao.map((value) => (
              <Picker.Item key={value} label={value} value={value} />
            ))}
          </Picker>
        </View>
        <MeuButton texto="Criar Item" onClick={() => salvar()} />
        <MeuButton texto="Voltar" onClick={() => voltar()} />
      </View>
    </SafeAreaView>
  );
};

export default AdicionarItemSalao;
