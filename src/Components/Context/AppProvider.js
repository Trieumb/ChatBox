import React, {createContext, useContext, useMemo, useState} from 'react';
import useFirestore from '../Hooks/useFirestore';
import {AuthContext} from './AuthProvider';

export const AppContext = createContext ();
const AppProvider = ({children}) => {
  const {user: {uid}} = useContext (AuthContext);

  const [isAddRoomVisible, setIsAddRoomVisible] = useState (false);
  const roomCondition = useMemo (
    () => {
      return {
        fieldName: 'members',
        operator: 'array-contains',
        compareValue: uid,
      };
    },
    [uid]
  );

  const rooms = useFirestore ('rooms', roomCondition);
  console.log (rooms);
  return (
    <AppContext.Provider value={{rooms, isAddRoomVisible, setIsAddRoomVisible}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
