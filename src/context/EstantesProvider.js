import React, {createContext, useState, useContext} from 'react';
import {ToastAndroid} from 'react-native';

import {ApiContext} from './ApiProvider';

export const EstanteContext = createContext({});

export const EstanteProvider = ({children}) => {
  const [estantes, setEstantes] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);

  //console.log(api);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getEstantes = async () => {
    try {
      const response = await api.get('/estantes');
      //console.log('Dados buscados via API');
      //console.log(response.data);
      //console.log(response.data.documents);
      let data = [];
      response.data.documents.map(d => {
        let k = d.name.split(
          'projects/pdm-aulas/databases/(default)/documents/estantes/',
        );

        data.push({
          genero: d.fields.genero.stringValue,
          quantidade: d.fields.quantidade.stringValue,
          uid: k[1],
        });
      });
      data.sort((a, b) => b.nome.localeCompare(a.nome));
      setEstantes(data);
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao buscar via API.');
      console.log(response);
    }
  };

  const saveEstante = async val => {
    try {
      await api.post('/estantes/', {
        fields: {
          nome: {stringValue: val.nome},
          tecnologias: {stringValue: val.tecnologias},
        },
      });
      showToast('Dados salvos.');
      getEstantes();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao saveEstante via API.');
      console.log(response);
    }
  };

  const updateEstante = async val => {
    //console.log(val);
    try {
      await api.patch('/estantes/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
          tecnologias: {stringValue: val.tecnologias},
        },
      });
      showToast('Dados salvos.');
      getEstantes();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao updateEstante via API.');
      console.log(response);
    }
  };

  const deleteEstante = async val => {
    try {
      await api.delete('/estantes/' + val);
      showToast('Estante excluída.');
      getEstantes();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao deleteEstante via API.');
      console.log(response);
    }
  };

  return (
    <EstanteContext.Provider
      value={{
        estantes,
        getEstantes,
        saveEstante,
        updateEstante,
        deleteEstante,
      }}>
      {children}
    </EstanteContext.Provider>
  );
};
