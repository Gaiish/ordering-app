import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from '../config/firebase';

interface IAuthContext {
  user: firebase.User;
  // setUser: () => void;
}

const defaultAuthContextValue = {
  user: null,
  // setUser: () => {},
};

const AuthContext = createContext(defaultAuthContextValue);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((usr) => {
      if (usr) {
        setUser(usr);
        router.push('/orders');
      } else {
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
      {children}
    </AuthContext.Provider>
  );
};

const useUser = () => useContext(AuthContext);

export default useUser;
