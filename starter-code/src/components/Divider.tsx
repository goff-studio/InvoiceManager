import React from 'react';
import {ViewProps} from '../types/theme';
import {View} from './theme';
import {usePalette} from '../hooks/usePalette';

export const Divider: React.FC<ViewProps> = ({
  row,
  backgroundColor,
  ...props
}) => {
  const {palette} = usePalette();

  return (
    <View
      {...props}
      opacity={0.5}
      width={row ? 1 : '100%'}
      height={!row ? 1 : '100%'}
      backgroundColor={backgroundColor || palette.textSecondary}
    />
  );
};
