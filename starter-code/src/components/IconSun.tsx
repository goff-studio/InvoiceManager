import React from 'react';
import {IconsProps} from '../types/theme';
import {View} from './theme/View';
import {usePalette} from '../hooks/usePalette';
import Sun from '../assets/icon-sun.svg';

export const IconSun: React.FC<IconsProps> = ({
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
      <Sun fill={color || palette.textSecondary} width={size} height={size} />
    </View>
  );
};
