export const persistToLS = (key: string, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const retrieveFromLS = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
};
