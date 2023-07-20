import React from 'react';
import {IconsProps} from '../types/theme';
import {View} from './theme';
import {usePalette} from '../hooks/usePalette';
import Flash from '../assets/icon-flash.svg';

export const IconMagic: React.FC<IconsProps> = ({
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
      <Flash fill={color || palette.textSecondary} width={size} height={size} />
    </View>
  );
};
