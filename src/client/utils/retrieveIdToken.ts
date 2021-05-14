import firebase from 'firebase';
import { persistToLS, retrieveFromLS } from './localStorage';

interface PersistedTokenObj {
  token: string;
  expTime: number;
}

/**
 *
 *
 * Checks if token in localstorage and if not expired then returns it
 * or makes a request for a new token then persists it.
 */

const retrieveIdToken = async (user: firebase.User): Promise<string> => {
  const USER_ID_TOKEN_KEY = `user-id-token-${user.uid}`;
  const persitedTokenRes: PersistedTokenObj = retrieveFromLS(USER_ID_TOKEN_KEY);
  try {
    if (persitedTokenRes && persitedTokenRes.expTime > Date.now()) {
      return persitedTokenRes.token;
    } else {
      const { token, expirationTime } = await user.getIdTokenResult();
      persistToLS(USER_ID_TOKEN_KEY, {
        token,
        expTime: new Date(expirationTime).getTime(),
      });
      return token;
    }
  } catch (error) {
    throw error;
  }
};

export default retrieveIdToken;
