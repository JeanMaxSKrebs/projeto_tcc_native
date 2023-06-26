import React from 'react';
import styled from 'styled-components/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import RNRestart from 'react-native-restart';
import {AccessibilityInfo} from 'react-native/types';

const ButtonExit = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 45px;
  height: 50px;
`;

const LogoutButton = () => {
  const signOut = () => {
    EncryptedStorage.removeItem('user_session')
      .then(() => {
        // auth()
        signOut();
        // .then(() => {

        // })
        // .catch((e) => {
        //     console.log("Logout, signOut em auth: " + e);
        // })
        RNRestart.Restart();
      })
      .catch(e => {
        console.log('Logout, signOut em remove item: ' + e);
      });
  };

  return (
    <ButtonExit onPress={signOut} underlayColor="transparent">
      <Image
        source={require('../assets/images/logout.png')}
        acessibilityLabel="botão sair"
      />
    </ButtonExit>
  );
};

export default LogoutButton;
