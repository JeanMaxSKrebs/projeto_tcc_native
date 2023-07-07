import React, {createContext} from 'react';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  return (
    <AuthUserContext.Provider value={{}}>{children}</AuthUserContext.Provider>
  );
};
