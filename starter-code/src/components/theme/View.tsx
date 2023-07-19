import React from 'react';
import {TouchableOpacity, View as RNView, ViewStyle} from 'react-native';
import {ViewProps} from '../../types/theme';

export const View: React.FC<ViewProps> = ({
  children,
  flex,
  center,
  backgroundColor,
  row,
  style = {},
  justifyContent,
  alignItems,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingVertical,
  paddingHorizontal,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginVertical,
  marginHorizontal,
  width,
  height,
  overflow,
  borderRadius,
  borderColor,
  opacity,
  borderWidth,
  onPress,
  ...props
}) => {
  const styleProp: ViewStyle = {
    justifyContent: (!!center && 'center') || justifyContent || undefined,
    alignItems: (!!center && 'center') || alignItems || undefined,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingVertical,
    overflow,
    paddingHorizontal,
    opacity,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginVertical,
    marginHorizontal,
    width,
    height,
    borderRadius,
    borderWidth,
    borderColor,
    backgroundColor,
    flex: flex ? 1 : undefined,
    flexDirection: row ? 'row' : undefined,
  };
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[styleProp, style]} {...props}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <RNView style={[styleProp, style]} {...props}>
      {children}
    </RNView>
  );
};
