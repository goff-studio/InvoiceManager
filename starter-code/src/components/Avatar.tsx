import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {themeConfig} from '../configs/themeConfig';
import {AvatarProps} from '../types/theme';
import {View} from './theme/View';

export const Avatar: React.FC<AvatarProps> = ({
  size = 40,
  source = require('../assets/image-avatar.jpg'),
  ...props
}) => {
  const style = StyleSheet.create({
    image: {borderRadius: themeConfig.radius.full, width: size, height: size},
  });

  return (
    <View paddingHorizontal={themeConfig.padding.medium}>
      <Image
        {...props}
        style={style.image}
        source={source}
        width={size}
        height={size}
      />
    </View>
  );
};
