import React, {createContext, useContext, useMemo, useState} from 'react';
import useFirestore from '../Hooks/useFirestore';
import {AuthContext} from './AuthProvider';

export const AppContext = createContext ();
const AppProvider = ({children}) => {
  const {user: {uid}} = useContext (AuthContext);
  const [isAddRoomVisible, setIsAddRoomVisible] = useState (false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState (false);
  const [selectedRoomId, setSelectedRoomId] = useState ('');

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

  const selectedRoom = useMemo (
    () => rooms.find (room => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );
  const usersCondition = useMemo (
    () => {
      return {
        fieldName: 'uid',
        operator: 'in',
        compareValue: selectedRoom.members,
      };
    },
    [selectedRoom.members]
  );
  const members = useFirestore ('user', usersCondition);
  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
