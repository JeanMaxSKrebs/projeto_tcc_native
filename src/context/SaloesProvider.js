import React, {createContext, useEffect, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import supabase from '../services/supabase';

export const SaloesContext = createContext({});

export const SaloesProvider = ({children}) => {
  const [saloes, setSaloes] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getHallsData = async () => {
    const {data} = supabase.get('/saloes');
    console.log(response.data);

    setSaloes(data);
  };

  //   useFocusEffect(
  //     useCallback(() => {
  //     getHallsData();
  //   }, []),
  //   )

  /* afsfasfasf
safsafasf
asfsafa
fasfaf
*/

  const fetchData = async () => {
    try {
      const {data, error} = await supabase.get('saloes');

      if (error) {
        console.error('Erro ao buscar os salões:', error);
        return;
      }

      const saloes = data.map(salao => ({
        uid: salao.id,
        nome: salao.nome,
        descricao: salao.descricao,
        cnpj: salao.cnpj,
        endereco: salao.endereco,
        cidade: salao.cidade,
        capacidade: salao.capacidade,
        logo: salao.logo,
        imagens: salao.imagens,
      }));

      setSaloes(saloes);
    } catch (error) {
      console.error('Erro ao buscar os salões:', error);
    }
  };

  useEffect(() => {
    const listener = firestore()
      .collection('saloes')
      .orderBy('nome')
      .onSnapshot(snapShot => {
        let data = [];
        snapShot.forEach(doc => {
          data.push({
            uid: doc.id,
            nome: doc.data().nome,
            descricao: doc.data().descricao,
          });
        });
        setSaloes(data);
      });
    fetchData();

    return () => {
      listener();
    };
  }, []);

  const saveHall = async hall => {
    // console.log(hall)
    try {
      await firestore().collection('saloes').doc(hall.uid).set(
        {
          nome: hall.nome,
          descricao: hall.descricao,
          cnpj: hall.cnpj,
          endereco: hall.endereco,
          cidade: hall.cidade,
          capacidade: hall.capacidade,
          logo: hall.logo,
          imagens: hall.imagens,
        },
        {merge: true},
      );
      return true;
    } catch (error) {
      console.error('HallProvider, saveHall: ', error);
      return false;
    }
  };

  const deleteHall = async uid => {
    await firestore()
      .collection('saloes')
      .doc(uid)
      .delete()
      .then(() => {
        showToast('Livro excluído.');
      })
      .catch(error => {
        console.error('HallProvider, deleteHall: ', error);
      });
  };

  return (
    <SaloesContext.Provider value={{saloes, saveHall, deleteHall}}>
      {children}
    </SaloesContext.Provider>
  );
};
