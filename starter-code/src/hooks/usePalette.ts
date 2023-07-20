import {useColorScheme} from 'react-native';
import {themeConfig} from '../configs/themeConfig';
import {useSettings} from './useSettings';

export const usePalette = () => {
  const scheme = useColorScheme();
  const {data} = useSettings();
  const lighting = data?.lighting;

  return {
    palette: themeConfig.palette[lighting || scheme || 'dark'],
    scheme,
  };
};
