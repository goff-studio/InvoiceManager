import React from 'react';
import {StyleSheet} from 'react-native';
import {themeConfig} from '../configs/themeConfig';
import LogoFile from '../assets/logo.svg';
import {ViewProps} from '../types/theme';
import {View} from './theme';

export const Logo: React.FC<ViewProps> = ({...props}) => {
  return (
    <View
      {...props}
      style={styles.logoContainer}
      height={75}
      width={75}
      center
      backgroundColor={themeConfig.colors.primary3}>
      <View
        style={styles.logoShadow}
        width={75}
        height={37.25}
        backgroundColor={themeConfig.colors.primary2}
      />
      <LogoFile fill={themeConfig.colors.light2} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    borderTopRightRadius: themeConfig.radius.large,
    borderBottomRightRadius: themeConfig.radius.large,
  },
  logoShadow: {
    position: 'absolute',
    borderTopLeftRadius: themeConfig.radius.large,
    borderBottomRightRadius: themeConfig.radius.large,
    bottom: 0,
  },
});
