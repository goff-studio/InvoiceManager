import {useColorScheme} from 'react-native';
import {themeConfig} from '../configs/themeConfig';

export const usePalette = () => {
  const scheme = useColorScheme();

  return {
    palette: themeConfig.palette[scheme || 'dark'],
    scheme,
  };
};
