import React, {useContext, useEffect, useState} from 'react';
import {Alert, ToastAndroid, StyleSheet, View } from 'react-native';
import {Container, TextInput, Text, TextPlaceholder} from './styles';
import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {ProfileContext} from '../../context/ProfileProvider';
import {CommonActions} from '@react-navigation/native';
import {COLORS} from '../../assets/colors';
import { SalaoContext } from '../../context/SalaoProvider';

const AtualizarDados = ({navigation}) => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [capacidade, setCapacidade] = useState(0); 

  const [loading, setLoading] = useState(false);
  const {salao, updateSalao} = useContext(SalaoContext);

  useEffect(() => {
    if (salao) {
      console.log(salao)
      setId(salao.id);
      setNome(salao.nome);
      setCidade(salao.cidade);
      setEndereco(salao.endereco);
      setCidade(salao.cidade);
      setDescricao(salao.descricao);
      setCapacidade(salao.capacidade);
    }
  }, [salao]);

  const salvar = () => {
    const newSalao = {
      id: id,
      nome: nome,
      cidade: cidade,
      endereco: endereco,
      descricao: descricao,
      capacidade: capacidade,
    };
    updateSalao(newSalao);
    navigation.goBack()
  };

  const renderPlaceholder = (value) => {
    if (value !== '') {
      return <TextPlaceholder>{value}</TextPlaceholder>;
    }
    return null;
  };

  return (
    <Container>
      <Text style={{ color: 'black', marginBottom: 20 }} >Atualizar Dados do Salão</Text>
      <View  style={{ width: '65%', height: 20 }} >
      {renderPlaceholder(nome ? 'Nome' : '')}
      </View>
      <TextInput
        placeholderTextColor="gray"
        value={nome}
        placeholder="Nome"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
        />
      <View  style={{ width: '65%' }} >
      {renderPlaceholder(descricao ? 'Descrição' : '')}
      </View>
      <TextInput
        placeholderTextColor="gray"
        value={descricao}
        placeholder="Descrição"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setDescricao(t)}
        />
      <View  style={{ width: '65%' }} >
        {console.log(capacidade)}
      {renderPlaceholder(capacidade ? 'Capacidade' : '')}
      </View>
      <TextInput
        placeholderTextColor="gray"
        value={capacidade.toString()}
        placeholder="Capacidade"
        keyboardType="numeric"
        returnKeyType="done"
        onChangeText={t => setCapacidade(t)}
        />
      <Text style={{ color: 'black', fontSize: 18 }} >Localização</Text>
      <View  style={{ width: '65%' }} >
      {renderPlaceholder(endereco ? 'Endereço' : '')}
      </View>
      <TextInput
        placeholderTextColor="gray"
        value={endereco}
        placeholder="Endereço"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setEndereco(t)}
        />
              <View  style={{ width: '65%' }} >
      {renderPlaceholder(endereco ? 'Cidade' : '')}
      </View>
      <TextInput
        placeholderTextColor="gray"
        value={cidade}
        placeholder="Cidade"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setCidade(t)}
        />
      <MeuButton texto="Salvar" onClick={salvar} />
      {loading && <Loading />}
    </Container>
  );
};

export default AtualizarDados;
