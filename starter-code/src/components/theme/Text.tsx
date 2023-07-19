import React from 'react';
import {StyleSheet, Text as RNText, TextStyle} from 'react-native';
import {FontFamilyValue, TextProps, TextVariants} from '../../types/theme';
import {usePalette} from '../../hooks/usePalette';
import {themeConfig} from '../../configs/themeConfig';

export const Text: React.FC<TextProps> = ({
  variant = TextVariants.Body2,
  children,
  fontFamily,
  center,
  color,
  paddingHorizontal,
  paddingVertical,
  paddingBottom,
  paddingTop,
  paddingLeft,
  textAlign,
  paddingRight,
  style,
  ...props
}) => {
  const {palette} = usePalette();
  const propStyle: TextStyle = {
    color: color || palette.textPrimary,
    textAlign: center ? 'center' : textAlign || undefined,
    fontFamily:
      fontFamily || variant?.includes('body')
        ? FontFamilyValue.MEDIUM
        : FontFamilyValue.BOLD,
    paddingHorizontal,
    paddingVertical,
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
  };

  return (
    <RNText style={[textVariantStyles[variant], propStyle, style]} {...props}>
      {children}
    </RNText>
  );
};

export const textVariantStyles = StyleSheet.create({
  h1: {
    fontSize: themeConfig.fontSizes.xLarge,
    lineHeight: themeConfig.lineHeights.xLarge,
    letterSpacing: -1,
  },
  h2: {
    fontSize: themeConfig.fontSizes.large,
    lineHeight: themeConfig.lineHeights.large,
    letterSpacing: -0.63,
  },
  h3: {
    fontSize: themeConfig.fontSizes.medium,
    lineHeight: themeConfig.lineHeights.medium,
    letterSpacing: -0.8,
  },
  h4: {
    fontSize: themeConfig.fontSizes.small,
    lineHeight: themeConfig.lineHeights.small,
    letterSpacing: -0.25,
  },
  body1: {
    fontSize: themeConfig.fontSizes.small,
    lineHeight: themeConfig.lineHeights.small,
    letterSpacing: -0.25,
  },
  body2: {
    fontSize: themeConfig.fontSizes.small,
    lineHeight: themeConfig.lineHeights.small,
    letterSpacing: -0.23,
  },
});
