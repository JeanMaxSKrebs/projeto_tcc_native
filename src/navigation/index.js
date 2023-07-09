import React from 'react';
import {SaloesProvider} from '../context/SaloesProvider';
import {SalaoProvider} from '../context/SalaoProvider';
import {ClienteProvider} from '../context/ClienteProvider';
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
                <SalaoProvider>
                  <ClienteProvider>
                    <Navigator />
                  </ClienteProvider>
                </SalaoProvider>
              </SaloesProvider>
            </LivrosProvider>
        </ProfileProvider>
        </ApiProvider>
      </AuthUserProvider>

  );
}
