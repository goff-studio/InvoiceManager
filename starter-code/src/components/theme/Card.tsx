import React from 'react';
import {ViewProps} from '../../types/theme';
import {View} from './View';
import {themeConfig} from '../../configs/themeConfig';
import {usePalette} from '../../hooks/usePalette';

export const Card: React.FC<ViewProps> = ({
  borderRadius = themeConfig.radius.xSmall,
  paddingHorizontal = themeConfig.padding.medium,
  paddingVertical = themeConfig.padding.medium,
  backgroundColor,
  children,
  ...props
}) => {
  const {palette} = usePalette();
  return (
    <View
      {...props}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor || palette.backgroundSecondary}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}>
      {children}
    </View>
  );
};
