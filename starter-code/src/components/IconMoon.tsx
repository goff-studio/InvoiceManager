import React from 'react';
import {IconsProps} from '../types/theme';
import {View} from './theme';
import {usePalette} from '../hooks/usePalette';
import Moon from '../assets/icon-moon.svg';

export const IconMoon: React.FC<IconsProps> = ({
  paddingVertical,
  paddingHorizontal,
  onPress,
  color,
  size = 25,
}) => {
  const {palette} = usePalette();
  return (
    <View
      onPress={onPress}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}>
      <Moon fill={color || palette.textSecondary} width={size} height={size} />
    </View>
  );
};
