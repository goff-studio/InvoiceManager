import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {InvoicesScreen} from '../screens/InvoicesScreen';
import {InvoicesDetailsScreen} from '../screens/InvoiceDetailsScreen';
import {InvoicesFormScreen} from '../screens/InvoiceFormScreen';
import {useSyncStatusBar} from '../hooks/useSyncStatusBar';
import {NavigationParamsList, NavigationScreens} from '../types/navigation';
import {usePopulateData} from '../hooks/usePopulateData';

const {Screen, Navigator} = createStackNavigator<NavigationParamsList>();

export const MainNavigation = () => {
  useSyncStatusBar();
  usePopulateData();

  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={NavigationScreens.INVOICES} component={InvoicesScreen} />
      <Screen
        name={NavigationScreens.INVOICE_DETAILS}
        component={InvoicesDetailsScreen}
      />
      <Screen
        name={NavigationScreens.INVOICE_FORM}
        component={InvoicesFormScreen}
      />
    </Navigator>
  );
};
