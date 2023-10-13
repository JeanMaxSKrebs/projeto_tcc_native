import React, {createContext, useState} from 'react';
import { supabase } from "../../supabase/supabase";

export const FestaContext = createContext({});

export const FestaProvider = ({children}) => {
  const [festa, setFesta] = useState();

  const getFestaByReservaId = async (reservaId) => {
    try {

      const { data, error } = await supabase
      .from('festas')
      .select('*')
      .eq('reserva_id', reservaId);
      
      if (error) {
        throw new Error('Error fetching festas data');
      }

      if (data) {
        setFesta(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <FestaContext.Provider value={{festa, getFestaByReservaId}}>
      {children}
    </FestaContext.Provider>
  );

};