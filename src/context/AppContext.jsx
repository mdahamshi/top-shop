import { createContext, useContext } from 'react';

export const AppContext = createContext({
  appName: 'My App',
});

export const useApp = () => useContext(AppContext);
