import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Container from '../components/Container';
import Spinner from '../components/Spinner';

import firebase from '../config/firebase';

const defaultAuthContextValue = {
  user: null,
};

const AuthContext = createContext(defaultAuthContextValue);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((usr) => {
      if (usr) {
        setUser(usr);
        setIsLoading(false);
        router.push('/orders');
      } else {
        setIsLoading(false);
        router.replace('/login');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}>
      {isLoading && (
        <Container centerContent>
          <Spinner />
        </Container>
      )}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

const useUser = () => useContext(AuthContext);

export default useUser;
