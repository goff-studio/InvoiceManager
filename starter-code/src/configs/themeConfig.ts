import {Dimensions} from 'react-native';
import {PaletteVariants} from '../types/theme';

const colors = {
  dark1: '#252945',
  dark2: '#1e2139',
  dark3: '#141625',
  dark4: '#0c0e16',
  light1: '#f8f8f8',
  light2: '#dfe3fa',
  light3: '#888eb0',
  light4: '#eef1ff',
  primary1: '#7e88c3',
  primary2: '#9277ff',
  primary3: '#7c5dfa',
  accent1: '#FF9797',
  accent2: '#ec5757',
  success: '#25af55',
  warning: '#ef7438',
};

const dark: PaletteVariants = {
  backgroundPrimary: colors.dark3,
  backgroundSecondary: colors.dark2,
  backgroundDisabled: colors.dark1,
  textPrimary: colors.light1,
  textSecondary: colors.primary1,
  textAccent: colors.primary2,
  textError: colors.accent1,
  textLight: colors.light1,
};

const light: PaletteVariants = {
  backgroundPrimary: colors.light1,
  backgroundSecondary: colors.light2,
  backgroundDisabled: colors.light4,
  textPrimary: colors.dark4,
  textSecondary: colors.dark2,
  textAccent: colors.primary3,
  textError: colors.accent2,
  textLight: colors.light3,
};

const padding = {
  large: 40,
  semiLarge: 30,
  medium: 25,
  semiSmall: 20,
  small: 15,
  xSmall: 10,
  xxSmall: 5,
};

const fontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 32,
};

const lineHeights = {
  small: 15,
  medium: 24,
  large: 22,
  xLarge: 36,
};

const dimension = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
};

const radius = {
  full: 50,
  large: 25,
  small: 15,
  xSmall: 8,
};

export const themeConfig = {
  colors,
  palette: {dark, light},
  padding,
  fontSizes,
  radius,
  lineHeights,
  dimension,
};
