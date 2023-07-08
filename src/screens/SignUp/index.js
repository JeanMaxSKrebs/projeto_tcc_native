import React, {useState, useContext, useEffect} from 'react';
import {Alert, TouchableOpacity, Text, View } from 'react-native';
import MeuButton from '../../components/MeuButton';
import {Body, TextInput} from './styles';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../components/Loading';

import { SalaoContext } from '../../context/SalaoProvider';

  const SignUp = ({navigation}) => {
  // const [nome, setNome] = useState('');
  // const [email, setEmail] = useState('');
  // const [senha, setSenha] = useState('');
  // const [confirmaSenha, setConfirmaSenha] = useState('');
  const [nome, setNome] = useState('jean');
  const [email, setEmail] = useState('jeanskrebs@gmail.com');
  const [senha, setSenha] = useState('Teste123');
  const [confirmaSenha, setConfirmaSenha] = useState('Teste123');
  const [cpf, setCpf] = useState('04506635078');
  const [cnpj, setCnpj] = useState('01855743000106');
  const [tipo, setTipo] = useState('Cliente');

  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);

  const { saveSalao } = useContext(SalaoContext);

  const handleCheck = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setTipo('Cliente');
    } else {
      setTipo('Salão');
    }
  };

  const cadastrar = async () => {
    if (nome !== '' && email !== '' && senha !== '' && confirmaSenha !== '' && (cpf !== '' || cnpj !=='')) {
      if (senha === confirmaSenha) {
        try {
          setLoading(true);
          console.log(isChecked);
          if(isChecked) {
            const clienteData = {
              nome: nome,
              email: email,
              cpf: cpf,
            };
            // await saveCliente(salaoData);
          } else {
            const salaoData = {
              nome: nome,
              email: email,
              cnpj: cnpj,
            };
            // console.log(salaoData)
            await saveSalao(salaoData);
          }
          console.log('tipo')
          console.log(tipo)
          await auth().createUserWithEmailAndPassword(email, senha);
          let userFirebase = auth().currentUser;
          console.log(userFirebase);
          let user = {};
          user.nome = nome;
          user.email = email;
          user.tipo = tipo;
          // console.log(user);
          // console.log('SignUp Cadastrar: User Added!1');
          await userFirebase.sendEmailVerification();
          Alert.alert(
            'Informação',
            'Foi Enviado um email para: ' + email + 'para verificação',
          );
          await firestore().collection('users').doc(userFirebase.uid).set(user);
          // console.log('SignUp Cadastrar: User Added!1');
          setLoading(false);

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'SignIn'}],
            }),
          );
        } catch (e) {
          setLoading(false);
          console.log('SignUp: cadastrar:' + e);
          switch (e.code) {
            case 'auth/email-already-in-use':
              Alert.alert('Erro', 'Email já esta em uso.');
              break;
            case 'auth/operation-not-allowed':
              Alert.alert('Erro', 'Problemas ao fazer o cadastro.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email Inválido.');
              break;
            case 'auth/weak-password':
              Alert.alert('Erro', 'Senha Fraca. Digite uma senha Forte.');
              break;
          }
        }
      } else {
        Alert.alert('Erro', 'As Senhas Diferem');
      }
    } else {
      Alert.alert('Erro', 'Por Favor, preencha todos os campos');
    }
  };
  return (
    <Body>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="next"
        defaultValue="jean" 
        onChangeText={t => setNome(t)}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        defaultValue="jeanskrebs@gmail.com" 
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
        secureTextEntry={true}
        defaultValue="Teste123" 
        onChangeText={t => setSenha(t)}
      />
      <TextInput
        placeholder="Confirmar Senha"
        keyboardType="default"
        returnKeyType="send"
        secureTextEntry={true}
        defaultValue="Teste123" 
        onChangeText={t => setConfirmaSenha(t)}
      />
      <TouchableOpacity onPress={handleCheck} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Cadastrar como Cliente: </Text>
          <Text>{isChecked ? '✓' : '○'}</Text>
        </View>
      </TouchableOpacity>
      {isChecked ? <TextInput
        placeholder="Cpf"
        keyboardType="numeric"
        returnKeyType="next"
        defaultValue="04516635078" 
        onChangeText={t => setCpf(t)}
      /> : <TextInput
          placeholder="Cnpj"
          keyboardType="numeric"
          returnKeyType="next"
          defaultValue="01855743000106" 
          onChangeText={t => setCnpj(t)}
        />
      }
      <MeuButton texto={'Cadastrar'} onClick={cadastrar} />
      {loading && <Loading />}
    </Body>
  );
};

export default SignUp;