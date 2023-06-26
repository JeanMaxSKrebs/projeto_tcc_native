import React, {useState, useEffect, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {Container, TextInput} from './styles';
import MeuButton from '../../components/MeuButton';
import Loading from '../../components/Loading';
import {LivrosContext} from '../../context/LivrosProvider';
import DeleteButton from '../../components/DeleteButton';

const Livro = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [autor, setAutor] = useState('');
  const [volume, setVolume] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveBook, deleteBook} = useContext(LivrosContext);

  // console.log(route)
  // console.log(route.params)

  useEffect(() => {
    if (route.params.value === null) {
      setNome('');
      setDescricao('');
      setAutor('');
      setVolume('');
      setUid('');
    } else {
      // console.log(route.params);
      setNome(route.params.value.nome);
      setDescricao(route.params.value.descricao);
      setAutor(route.params.value.autor);
      setVolume(route.params.value.volume);
      setUid(route.params.value.uid);
    }

    return () => {
      console.log('desmontou Livro');
    };
  }, [route]);

  const salvar = async () => {
    setLoading(true);
    if (await saveBook({uid, nome, descricao, autor, volume})) {
      setLoading(false);
      navigation.goBack();
    } else {
      ToastAndroid.show('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert('Atenção', 'Você tem Certeza?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          if (await deleteBook(uid)) {
            ToastAndroid.show('Deletado', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Digite todos os campos', ToastAndroid.SHORT);
          }
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome do Livro"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Descricão"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDescricao(t)}
        value={descricao}
      />
      <TextInput
        placeholder="Autor"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setAutor(t)}
        value={autor}
      />
      <TextInput
        placeholder="Volume"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setVolume(t)}
        value={volume}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};

export default Livro;
