import React from 'react';
import { SaloesProvider } from '../context/SaloesProvider';
import { SalaoProvider } from '../context/SalaoProvider';
import { ClienteProvider } from '../context/ClienteProvider';
import { ItensSaloesProvider } from '../context/ItensSaloesProvider';
import { OrcamentosProvider } from '../context/OrcamentosProvider';
import { AuthUserProvider } from '../context/AuthUserProvider';
import { ProfileProvider } from '../context/ProfileProvider';
import { ApiProvider } from '../context/ApiProvider';
import { ItensOrcamentosProvider } from '../context/ItensOrcamentosProvider';

import { ThemeProvider } from "styled-components";

import Navigator from './Navigator';
import { COLORS } from "../assets/colors";
import theme from './styles/index';

import { useColorScheme } from "react-native";
// import { NavigationContainer } from '@react-navigation/native';

export default function Providers() {

  const deviceTheme = useColorScheme();
  console.log('deviceTheme');
  console.log(deviceTheme);
  return (
    <AuthUserProvider>
      <ApiProvider>
        <ProfileProvider>
          <SaloesProvider>
            <SalaoProvider>
              <OrcamentosProvider>
                <ItensSaloesProvider>
                  <ItensOrcamentosProvider>
                    <ThemeProvider theme={{ background: `${COLORS.background}`, color: `${COLORS.secundary}` }}>
                      <Navigator />
                    </ThemeProvider>
                  </ItensOrcamentosProvider>
                </ItensSaloesProvider>
              </OrcamentosProvider>
            </SalaoProvider>
          </SaloesProvider>
          <ClienteProvider>
          </ClienteProvider>
        </ProfileProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
