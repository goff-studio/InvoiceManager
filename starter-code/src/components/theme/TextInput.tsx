import React, {useMemo} from 'react';
import {StyleSheet, TextInput as RNTextInput} from 'react-native';
import {themeConfig} from '../../configs/themeConfig';
import {usePalette} from '../../hooks/usePalette';
import {FontFamilyValue, TextInputProps} from '../../types/theme';
import {InputContainer} from '../InputContainer';
import {convertToRgba} from '../../utils/theme';

export const TextInput: React.FC<TextInputProps> = ({
  paddingVertical = themeConfig.padding.medium / 2,
  paddingHorizontal = 0,
  marginLeft = 0,
  marginRight = 0,
  containerStyle,
  style,
  labelStyle,
  label,
  ...props
}) => {
  const {palette} = usePalette();
  const styles = useMemo(() => {
    return StyleSheet.create({
      textInputContainer: {
        height: themeConfig.padding.medium * 2,
        backgroundColor: palette.backgroundSecondary,
        borderRadius: themeConfig.radius.xSmall,
        borderWidth: 1,
        borderColor: palette.backgroundDisabled,
        color: palette.textPrimary,
        paddingHorizontal: themeConfig.padding.semiSmall,
        fontFamily: FontFamilyValue.BOLD,
        fontSize: themeConfig.fontSizes.small,
      },
    });
  }, [
    palette.backgroundDisabled,
    palette.backgroundSecondary,
    palette.textPrimary,
  ]);
  return (
    <InputContainer
      paddingHorizontal={paddingHorizontal}
      marginLeft={marginLeft}
      marginRight={marginRight}
      containerStyle={containerStyle}
      label={label}
      labelStyle={labelStyle}
      paddingVertical={paddingVertical}>
      <RNTextInput
        placeholderTextColor={convertToRgba(palette.textSecondary, 0.3)}
        {...props}
        style={[styles.textInputContainer, style]}
      />
    </InputContainer>
  );
};
