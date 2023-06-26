import React, { useState } from 'react';
import { Alert } from 'react-native';
import MeuButton from '../../components/MeuButton';
import { Body, TextInput } from './styles';
import auth from "@react-native-firebase/auth";
import { CommonActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SignUp = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');

    const cadastrar = () => {
        if (nome !== '' && email !== '' && senha !== '' && confirmaSenha !== '') {
            if (senha === confirmaSenha) {
                auth()
                    .createUserWithEmailAndPassword(email, senha)
                    .then(() => {
                        let userFirebase = auth().currentUser;
                        let user = {};
                        user.nome = nome;
                        user.email = email;
                        console.log(user);

                        firestore()
                            .collection('users')
                            .doc(userFirebase)
                            .set(user)
                            .then(() => {
                                console.log('SignUp Cadastrar: User Added!1');
                                userFirebase
                                    .sendEmailVerification()
                                    .then(() => {
                                        console.log('SignUp Cadastrar: User Added!2');
                                        Alert.alert('Informação', 'Foi Enviado um email para: ' + email + 'para verificação',
                                        );
                                        navigation.dispatch(
                                            CommonActions.reset({
                                                index: 0,
                                                routes: [{ name: 'SignIn' }],
                                            }),
                                        );
                                    })
                                    .catch((e) => {
                                        console.log('SignUp: cadastrar(01):' + e);
                                    });
                            })
                            .catch((e) => {
                                console.log('SignUp: cadastrar(02):' + e);
                            });
                    })
                    .catch((e) => {
                        console.log('SignUp: cadastrar(03):' + e + "  " + e.code);
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
                    })
            } else {
                Alert.alert('Erro', 'As Senhas Diferem');
            }
        } else {
            Alert.alert('Erro', 'Por Favor, preencha todos os campos');
        }
    };

    return (
        <Body >
            <TextInput
                placeholder="Nome Completo"
                keyboardType="default"
                returnKeyType="next"
                onChangeText={(t) => setNome(t)}
            />
            <TextInput
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={(t) => setEmail(t)}
            />
            <TextInput
                placeholder="Senha"
                keyboardType="default"
                returnKeyType="next"
                secureTextEntry={true}
                onChangeText={(t) => setSenha(t)}
            />
            <TextInput
                placeholder="Confirmar Senha"
                keyboardType="default"
                returnKeyType="send"
                secureTextEntry={true}
                onChangeText={(t) => setConfirmaSenha(t)}
            />
            <MeuButton texto={"Cadastrar"} onClick={cadastrar} />
        </Body>
    );
};

export default SignUp;