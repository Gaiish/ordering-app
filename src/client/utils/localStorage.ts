export const persistToLS = (key: string, value: string | Object) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const retrieveFromLS = (key: string): string | Object | null => {
  const data = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
};
