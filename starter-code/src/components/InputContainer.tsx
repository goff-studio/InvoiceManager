import React from 'react';
import {Text, themeConfig, View} from './theme';
import {InputProps} from '../types/theme';
import {usePalette} from '../hooks/usePalette';

export const InputContainer: React.FC<InputProps> = ({
  children,
  label,
  paddingVertical = themeConfig.padding.medium / 2,
  paddingHorizontal = 0,
  marginLeft = 0,
  marginRight = 0,
  containerStyle,
  labelStyle,
  ...props
}) => {
  const {palette} = usePalette();
  return (
    <View
      {...props}
      paddingHorizontal={paddingHorizontal}
      marginLeft={marginLeft}
      marginRight={marginRight}
      style={containerStyle}
      paddingVertical={paddingVertical}>
      {!!label && (
        <Text
          style={labelStyle}
          color={palette.textSecondary}
          paddingBottom={10}>
          {label}
        </Text>
      )}
      {children}
    </View>
  );
};
