import React, { useState, useContext, useEffect } from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import MeuButton from '../../components/MeuButton';
import { Body, TextInput } from './styles';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../components/Loading';

import { SalaoContext } from '../../context/SalaoProvider';
import { ClienteContext } from '../../context/ClienteProvider.js';
import { cpf } from 'cpf-cnpj-validator';
import { cnpj } from 'cpf-cnpj-validator';
import { COLORS } from '../../assets/colors';

const SignUp = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [showCpf, setShowCpf] = useState('');
  const [showCnpj, setShowCnpj] = useState('');

  // const [nome, setNome] = useState('jean');
  // const [email, setEmail] = useState('jeanmaxskrebs@gmail.com');
  // const [senha, setSenha] = useState('Teste123');
  // const [confirmaSenha, setConfirmaSenha] = useState('Teste123');
  // const [cpf, setCpf] = useState('04506635078');
  // const [cnpj, setCnpj] = useState('01855743000106');

  const [tipo, setTipo] = useState('Cliente');
  const [verificado, setVerificado] = useState('none');

  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);

  const { saveSalao } = useContext(SalaoContext);
  const { saveCliente } = useContext(ClienteContext);

  const [showVerify, setShowVerify] = useState(false);
  const handleCheck = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setTipo('Cliente');
      setShowCnpj('')
      setShowCpf('')
      setVerificado('none')
    } else {
      setTipo('Salão');
      setShowCnpj('')
      setShowCpf('')
      setVerificado('none')
    }
  };

  const verifyDocument = () => {
    if (tipo == 'Cliente') {
      console.log(showCpf);
      const cpfApenasNumeros = showCpf.replace(/\D/g, '');

      if (cpf.isValid(cpfApenasNumeros)) {
        // console.log('aceito');
        setVerificado('true');
        return true;
      }
    } else {
      console.log(showCnpj);
      const cnpjApenasNumeros = showCnpj.replace(/\D/g, '');

      if (cnpj.isValid(cnpjApenasNumeros)) {
        // console.log('aceito');
        setVerificado('true');
        return true;
      }
    }
    // console.log('errou');
    setVerificado('false');
    return false;
  };

  const formatarCPF = (cpf) => {
    console.log(cpf);
    const cpfApenasNumeros = cpf.replace(/\D/g, '');

    let cpfFormatado = '';

    for (let i = 0; i < cpfApenasNumeros.length; i++) {
      cpfFormatado += cpfApenasNumeros[i];
      if (i === 2 || i === 5) cpfFormatado += '.';
      if (i === 8) cpfFormatado += '-';
    }

    console.log(cpfFormatado);
    return cpfFormatado;
  };

  const formatarCNPJ = (cnpj) => {
    console.log(cnpj);
    const cnpjApenasNumeros = cnpj.replace(/\D/g, '');

    let cnpjFormatado = '';

    for (let i = 0; i < cnpjApenasNumeros.length; i++) {
      cnpjFormatado += cnpjApenasNumeros[i];
      if (i === 1 || i === 4) cnpjFormatado += '.';
      if (i === 7) cnpjFormatado += '/';
      if (i === 11) cnpjFormatado += '-';
    }

    console.log(cnpjFormatado);
    return cnpjFormatado;
  };

  const cadastrar = async () => {
    if (nome !== '' && email !== '' && senha !== '' && confirmaSenha !== '' && (cpf !== '' || cnpj !== '')) {
      if (senha === confirmaSenha) {
        try {
          setLoading(true);
          console.log(isChecked);
          if (isChecked) {
            const clienteData = {
              nome: nome,
              email: email,
              cpf: showCpf,
            };
            console.log('clienteData')
            console.log('clienteData')
            console.log(clienteData)
            // : undefined is not a function
            await saveCliente(clienteData);
          } else {
            const salaoData = {
              nome: nome,
              email: email,
              cnpj: showCnpj,
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
              routes: [{ name: 'SignIn' }],
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
        // defaultValue="jean" 
        onChangeText={t => setNome(t)}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        // defaultValue="jeanmaxskrebs@gmail.com" 
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
        secureTextEntry={true}
        // defaultValue="Teste123" 
        onChangeText={t => setSenha(t)}
      />
      <TextInput
        placeholder="Confirmar Senha"
        keyboardType="default"
        returnKeyType="send"
        secureTextEntry={true}
        // defaultValue="Teste123" 
        onChangeText={t => setConfirmaSenha(t)}
      />
      <TouchableOpacity onPress={handleCheck} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isChecked ? <Text>Cadastrar como Salão: ○</Text>
            : <Text>Cadastrar como Cliente: ○</Text>}
        </View>
      </TouchableOpacity>
      {isChecked ?
        <TextInput
          placeholder="Cpf"
          keyboardType="numeric"
          returnKeyType="next"
          maxLength={14}
          // defaultValue="04516635078"
          onChangeText={(t) => {
            setShowCpf(formatarCPF(t));

            if (t.length === 14) {
              setShowVerify(true);
            } else {
              setShowVerify(false);
              setVerificado('none')
            }
          }}
          value={showCpf}
        />
        : <TextInput
          placeholder="Cnpj"
          keyboardType="numeric"
          returnKeyType="next"
          maxLength={18}
          // defaultValue="01855743000106" 
          onChangeText={(t) => {
            setShowCnpj(formatarCNPJ(t));

            // formatarCNPJ(t)
            if (t.length === 18) {
              setShowVerify(true);
            } else {
              setShowVerify(false);
              setVerificado('none')
            }
          }}
          value={showCnpj}
        />
      }
      {showVerify &&
        <TouchableOpacity onPress={verifyDocument} >
          <View style={{
            justifyContent: 'center',
            borderColor: COLORS.primary,
            borderWidth: 1, padding: 10, borderRadius: 15,
            backgroundColor: verificado == 'none' ? COLORS.primary : (verificado == 'true' ? COLORS.green : COLORS.red)
          }}>
            <Text style={{ fontSize: 18, textAlign: 'center' }}>Verificar </Text>
          </View>
        </TouchableOpacity>
      }
      {verificado === 'true' ?
        <MeuButton texto={'Cadastrar'} onClick={cadastrar} />
        :
        <MeuButton disabled={true} texto={'Cadastrar'} onClick={cadastrar} />
      }
      {loading && <Loading />}
    </Body >
  );
};

export default SignUp;