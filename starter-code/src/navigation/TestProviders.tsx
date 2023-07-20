import {SafeAreaProvider} from '../components/SafeAreaProvider';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigation} from './MainNavigation';
import React from 'react';
import {TestProvider} from '../components/TestProvider';

export const TestProviders = () => {
  return (
    <TestProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </TestProvider>
  );
};
