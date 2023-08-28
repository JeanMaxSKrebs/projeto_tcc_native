import React from 'react';
import {SaloesProvider} from '../context/SaloesProvider';
import {SalaoProvider} from '../context/SalaoProvider';
import {ClienteProvider} from '../context/ClienteProvider';
import {OrcamentosProvider} from '../context/OrcamentosProvider';
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
          <SaloesProvider>
            <SalaoProvider>
              <ClienteProvider>
                <OrcamentosProvider>
                    <Navigator />
                </OrcamentosProvider>
              </ClienteProvider>
            </SalaoProvider>
          </SaloesProvider>
        </ProfileProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
