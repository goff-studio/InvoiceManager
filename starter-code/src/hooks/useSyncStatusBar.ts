import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {LIGHTING} from '../types/settings';
import {useSettings} from './useSettings';
import {usePalette} from './usePalette';

export const useSyncStatusBar = () => {
  const {data: {lighting} = {}} = useSettings();
  const {scheme} = usePalette();
  useEffect(() => {
    StatusBar.setBarStyle(
      (lighting || scheme) === LIGHTING.LIGHT
        ? 'dark-content'
        : 'light-content',
    );
  }, [lighting, scheme]);
};
