import { Provider } from 'react-redux';
import { store } from '../../services/redux/store';
import React from 'react';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
