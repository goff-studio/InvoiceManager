import React, {useMemo} from 'react';
import {ViewProps} from '../types/theme';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {usePalette} from '../hooks/usePalette';
import {Header} from './Header';

export const SafeAreaProvider: React.FC<ViewProps> = ({children}) => {
  const {palette} = usePalette();
  const lightingStyle = useMemo(() => {
    return StyleSheet.create({
      statusbar: {
        flex: 0,
        height: Platform.OS === 'android' ? 20 : undefined,
        backgroundColor: palette.backgroundSecondary,
      },
    });
  }, [palette.backgroundSecondary]);

  return (
    <React.Fragment>
      <SafeAreaView style={lightingStyle.statusbar}>
        <StatusBar backgroundColor={'transparent'} translucent />
      </SafeAreaView>
      <Header />
      {children}
    </React.Fragment>
  );
};
