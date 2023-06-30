import React from 'react';
import {SaloesProvider} from '../context/SaloesProvider';
import {LivrosProvider} from '../context/LivrosProvider';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {ProfileProvider} from '../context/ProfileProvider';
import {ApiProvider} from '../context/ApiProvider';

import Navigator from './Navigator';
// import { NavigationContainer } from '@react-navigation/native';

export default function Providers() {
  return (
    <AuthUserProvider>
        <ApiProvider>
          <ProfileProvider>
            <LivrosProvider>
              <SaloesProvider>
                <Navigator />
              </SaloesProvider>
            </LivrosProvider>
        </ProfileProvider>
        </ApiProvider>
      </AuthUserProvider>

  );
}

