import React, { useContext, useEffect, useState } from 'react';
import {
  Alert, ToastAndroid, Image, View, TouchableOpacity,
  ScrollViewComponent, ScrollView, SafeAreaView
} from 'react-native';
import { Container, TextInput, Text, TextPlaceholder } from './styles';
import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import { AuthUserContext } from '../../context/AuthUserProvider';
import { ProfileContext } from '../../context/ProfileProvider';
import { CommonActions } from '@react-navigation/native';
import { COLORS } from '../../assets/colors';
import { SalaoContext } from '../../context/SalaoProvider';
import ImagePicker from '../../components/Camera/ImagePicker';
import Texto from '../../components/Texto';
import Voltar from '../../components/Voltar';

const AtualizarDados = ({ route, navigation }) => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [logo, setLogo] = useState(null);
  const [newLogo, setNewLogo] = useState(null);
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [capacidade, setCapacidade] = useState(0);

  const [loading, setLoading] = useState(false);
  const { updateSalao } = useContext(SalaoContext);
  // console.log(route.params)
  let salao = route.params.salao;
  // console.log(salao)
  useEffect(() => {
    if (salao) {
      // console.log(salao)
      setId(salao.id);
      setNome(salao.nome);
      setCidade(salao.cidade);
      setEndereco(salao.endereco);
      setDescricao(salao.descricao);
      setCapacidade(salao.capacidade);
      setLogo(salao.logo);
    }
  }, [salao]);

  const voltar = () => {
    navigation.goBack();
  };

  const salvar = () => {
    const newSalao = {
      id: id,
      nome: nome,
      logo: newLogo ? newLogo : logo,
      cidade: cidade,
      endereco: endereco,
      descricao: descricao,
      capacidade: capacidade,
      tipo: 'logo'
    };
    console.log('newSalao');
    console.log(newSalao);
    updateSalao(newSalao);
    navigation.goBack()
  };

  const renderPlaceholder = (value) => {
    if (value !== '') {
      return <TextPlaceholder>{value}</TextPlaceholder>;
    }
    return null;
  };


  const handleImageSelected = (imageUri) => {
    console.log('imageUri');
    console.log(imageUri);
    setNewLogo(imageUri);
  };

  return (

    <SafeAreaView>
      <Voltar texto="Voltar" onClick={() => voltar()} />
      <ScrollView style={{height: '90%'}}>

        <Container>
          <Text style={{ color: 'black', marginBottom: 20 }} >Atualizar Dados do Salão</Text>

          {logo !== undefined && logo !== null
            && (
              <View>
                <View style={{ width: '65%' }} >
                  {renderPlaceholder(logo ? 'Logo' : '')}
                </View>
                <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 15 }}>
                  <Image
                    style={{ width: 300, height: 300, borderRadius: 15 }}
                    source={{ uri: logo }}
                    resizeMode="cover"
                  />
                </View>

              </View>
            )
          }
          <ImagePicker onPress={handleImageSelected} />


          <View style={{ width: '65%', marginTop: 30 }} >
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
          <View style={{ width: '65%' }} >
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
          <View style={{ width: '65%' }} >
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
          <View style={{ width: '65%' }} >
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
          <View style={{ width: '65%' }} >
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default AtualizarDados;
