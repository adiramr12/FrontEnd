/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

const CaloriesManagerContext = createContext();

export const CaloriesManagerProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  useEffect(() => {
    window.idb.openCaloriesDB('caloriesdb', 1).then(setDb);
  }, []);

  const payload = {
    db,
  };
  return <CaloriesManagerContext.Provider value={payload}>{children}</CaloriesManagerContext.Provider>;
};

export const useCaloriesManagerContext = () => {
  return useContext(CaloriesManagerContext);
};
