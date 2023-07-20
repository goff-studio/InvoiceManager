import React, {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from '../redux/reducers';

interface TestProviderProps {
  children: ReactNode;
}

export const TestProvider: React.FC<TestProviderProps> = ({children}) => {
  const store = createStore(rootReducer);
  return <Provider store={store}>{children}</Provider>;
};
