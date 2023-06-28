import React from 'react';
import {SaloesProvider} from '../context/SaloesProvider';
import {LivrosProvider} from '../context/LivrosProvider';
import {AuthUserProvider} from '../context/AuthUserProvider';
import Navigator from './Navigator';
// import { NavigationContainer } from '@react-navigation/native';

export default function Providers() {
  return (
      <AuthUserProvider>
        <LivrosProvider>
            <SaloesProvider>
              <Navigator />
            </SaloesProvider>
        </LivrosProvider>
      </AuthUserProvider>

  );
}
