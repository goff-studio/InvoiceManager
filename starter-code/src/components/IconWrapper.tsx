import React from 'react';
import {IconsProps} from '../types/theme';
import {View} from './theme';

export const IconWrapper: React.FC<IconsProps> = ({icon, color, ...props}) => {
  return (
    <View {...props}>
      {React.isValidElement(icon) &&
        React.cloneElement(icon, {
          ...icon.props,
          fill: color,
        })}
    </View>
  );
};
