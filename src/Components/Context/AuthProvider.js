import React, {createContext, useEffect, useState} from 'react';
import {auth} from '../../Firebase/config';
import {Spin} from 'antd';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext ();
const AuthProvider = ({children}) => {
  const navigate = useNavigate ();
  const [user, setUser] = useState ({});
  const [isLoading, setIsLoading] = useState (true);
  useEffect (
    () => {
      const unsubscibed = auth.onAuthStateChanged (user => {
        console.log (user);
        if (user) {
          const {displayName, email, uid, photoURL} = user;
          setUser ({
            displayName,
            email,
            uid,
            photoURL,
          });
          setIsLoading (false);
          navigate ('/', {replace: true});
          return;
        }
        setIsLoading (false);
        navigate ('/login', {replace: true});
      });
      return () => {
        unsubscibed ();
      };
    },
    [navigate]
  );

  return (
    <AuthContext.Provider value={{user}}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
