import {ColorValue} from 'react-native';
import {ButtonVariants, PaletteVariants} from '../types/theme';
import {themeConfig} from '../configs/themeConfig';

export const convertToRgba = (color: ColorValue, opacity = 0.9): string => {
  if (typeof color === 'string' && color.startsWith('#')) {
    const hexColor = color.slice(1);
    const [red, green, blue] = [0, 2, 4].map(startIndex =>
      parseInt(hexColor.substr(startIndex, 2), 16),
    );
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  }
  return String(color);
};

export const generateButtonVariant = (
  variant: ButtonVariants,
  palette: PaletteVariants,
) => {
  let backgroundColor;
  let textColor;
  switch (variant) {
    case ButtonVariants.ACCENT:
      backgroundColor = themeConfig.colors.accent2;
      textColor = themeConfig.colors.light1;
      break;
    case ButtonVariants.DARK:
      backgroundColor = themeConfig.colors.dark1;
      textColor = palette.textLight;
      break;
    case ButtonVariants.PRIMARY:
      backgroundColor = themeConfig.colors.primary3;
      textColor = themeConfig.colors.light1;
      break;
    case ButtonVariants.SECONDARY:
      backgroundColor = palette.backgroundDisabled;
      textColor = palette.textLight;
      break;
    default:
      backgroundColor = themeConfig.colors.primary3;
      textColor = themeConfig.colors.primary1;
  }
  return {textColor, backgroundColor};
};
