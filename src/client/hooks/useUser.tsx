import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import firebase from 'config/firebase';
import Container from 'components/Container';
import Spinner from 'components/Spinner';
import { persistToLS, retrieveFromLS } from 'utils/localStorage';

interface IAuthContext {
  user: firebase.User | null;
}

export interface IUserDetails {
  name: string;
  email: string;
  phone: string;
  uid: string;
}

const defaultAuthContextValue: IAuthContext = {
  user: null,
};

const AuthContext = createContext(defaultAuthContextValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getUserDetails = useCallback(async (user: firebase.User) => {
    const firestore = firebase.firestore();
    const { uid } = user;
    try {
      const userDoc = await firestore.collection('users').doc(uid).get();
      persistToLS(
        `oa-user-${uid}`,
        (userDoc.data() as unknown) as IUserDetails,
      );
    } catch (error) {
      console.log('Failed to retrieve user info');
    }
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (usr) => {
      if (usr) {
        setUser(usr);
        if (!retrieveFromLS(`@oa-user-${usr.uid}`)) {
          await getUserDetails(usr);
        }
        setIsLoading(false);
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
