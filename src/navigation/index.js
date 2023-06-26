import React from 'react';
import {LivrosProvider} from '../context/LivrosProvider';
import {AuthUserProvider} from '../context/AuthUserProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <LivrosProvider>
        <Navigator />
      </LivrosProvider>
    </AuthUserProvider>
  );
}
