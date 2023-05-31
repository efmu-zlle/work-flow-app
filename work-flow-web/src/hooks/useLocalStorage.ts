import { useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialData: T | null
): [T, (data: T) => void] {
  const [storedData, setStoredData] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialData;
    } catch (error) {
      return initialData;
    }
  });

  const setData = (data: T) => {
    try {
      setStoredData(data);
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedData, setData];
}

export default useLocalStorage;
