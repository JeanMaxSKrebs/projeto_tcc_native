import React, {createContext, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AuthUserContext} from './AuthUserProvider';
import { supabase } from './supabaseConfig'; // Importe sua configuração do Supabase

export const ProfileContext = createContext({});

export const ProfileProvider = ({children}) => {
  const {getUser, signOut} = useContext(AuthUserContext);

  const save = async user => {
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({nome: user.nome}, {merge: true});
      //renew user in session
      if (await getUser(user.pass)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  const del = async uid => {
    try {
      await firestore().collection('users').doc(uid).delete();
      await auth().currentUser.delete();
      await signOut();
      return true;
    } catch (e) {
      return false;
    }
  };
  
  // const del = async (uid, salaoIdToDelete) => {
  //   try {
  //     // Executar operações de exclusão no banco de dados
  //     const sql = `
  //       BEGIN;
  //       DELETE FROM itens_orcamentos
  //       WHERE orcamento_id IN (SELECT id FROM orcamentos WHERE salao_id = ${salaoIdToDelete});
        
  //       DELETE FROM orcamentos
  //       WHERE salao_id = ${salaoIdToDelete};
        
  //       UPDATE itens
  //       SET salao_id = remove_salao_id(salao_id, ${salaoIdToDelete})
  //       WHERE ${salaoIdToDelete} = ANY(salao_id);
        
  //       DELETE FROM itens
  //       WHERE salao_id @> ARRAY[${salaoIdToDelete}];
        
  //       DELETE FROM saloes
  //       WHERE id = ${salaoIdToDelete};
        
  //       COMMIT;
  //     `;
  
  //     await firestore().collection('users').doc(uid).delete();
  //     await auth().currentUser.delete();
  
  //     const { data, error } = await supabase.rpc('run_sql', { sql });
  //     if (error) {
  //       throw error;
  //     }
  
  //     await signOut();
  
  //     return true;
  //   } catch (e) {
  //     console.error('Erro ao excluir usuário:', e);
  //     return false;
  //   }
  // };
  

  async function updatePassword(pass) {
    try {
      await auth().currentUser.updatePassword(pass);
      return true;
    } catch (e) {
      console.error('updatePassword' + e);
      return false;
    }
  }

  return (
    <ProfileContext.Provider value={{save, del, updatePassword}}>
      {children}
    </ProfileContext.Provider>
  );
};