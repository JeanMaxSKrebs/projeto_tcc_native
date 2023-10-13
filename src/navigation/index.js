import React from 'react';
import { SaloesProvider } from '../context/SaloesProvider';
import { SalaoProvider } from '../context/SalaoProvider';
import { ClienteProvider } from '../context/ClienteProvider';
import { ItensSaloesProvider } from '../context/ItensSaloesProvider';
import { OrcamentosProvider } from '../context/OrcamentosProvider';
import { AuthUserProvider } from '../context/AuthUserProvider';
import { ProfileProvider } from '../context/ProfileProvider';
import { ChatProvider } from '../context/ChatProvider';
import { FestaProvider } from '../context/FestaProvider';
import { ApiProvider } from '../context/ApiProvider';
import { ItensOrcamentosProvider } from '../context/ItensOrcamentosProvider';

import { ThemeProvider } from "styled-components";

import Navigator from './Navigator';
import { COLORS } from "../assets/colors";
import theme from './styles/index';

import { useColorScheme } from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
import themes from "./styles/";


export default function Providers() {
  // dark, light, null, undefined
  const deviceTheme = useColorScheme();
  // console.log('deviceTheme');
  // console.log(deviceTheme);

  // console.log(themes);
  //define o tema, o segundo parametro é o padrão
  const theme = themes[deviceTheme] || theme.dark;
  // console.log(theme);
  return (
    <AuthUserProvider>
      <ApiProvider>
        <ProfileProvider>
          <ChatProvider>
            <ClienteProvider>
              <SaloesProvider>
                <SalaoProvider>
                  <FestaProvider>
                    <OrcamentosProvider>
                      <ItensSaloesProvider>
                        <ItensOrcamentosProvider>
                          <ThemeProvider theme={theme}>
                            <Navigator />
                          </ThemeProvider>
                        </ItensOrcamentosProvider>
                      </ItensSaloesProvider>
                    </OrcamentosProvider>
                  </FestaProvider>
                </SalaoProvider>
              </SaloesProvider>
            </ClienteProvider>
          </ChatProvider>
        </ProfileProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
