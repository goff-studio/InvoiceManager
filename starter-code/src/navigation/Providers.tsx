import React from 'react';
import {Provider} from 'react-redux';
import {index, persistor} from '../redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigation} from './MainNavigation';
import {SafeAreaProvider} from '../components/SafeAreaProvider';

const Providers: React.FC = () => {
  return (
    <Provider store={index}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};
export default Providers;
