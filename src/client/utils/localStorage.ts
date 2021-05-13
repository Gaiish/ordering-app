import { IUserDetails } from '../hooks/useUser';

export const persistToLS = (key: string, value: IUserDetails) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const retrieveFromLS = (key: string): IUserDetails | null => {
  const data = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
};
