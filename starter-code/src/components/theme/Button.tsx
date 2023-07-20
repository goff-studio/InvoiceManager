import React from 'react';
import {View} from './View';
import {Text} from './Text';
import {themeConfig} from '../../configs/themeConfig';
import {ButtonProps, ButtonVariants, TextVariants} from '../../types/theme';
import {generateButtonVariant} from '../../utils/theme';
import {usePalette} from '../../hooks/usePalette';
import {IconWrapper} from '../IconWrapper';

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = ButtonVariants.PRIMARY,
  full,
  paddingHorizontal = themeConfig.padding.semiSmall,
  icon,
  circleIcon,
  ...props
}) => {
  const {palette} = usePalette();
  const {backgroundColor, textColor} = generateButtonVariant(variant, palette);
  return (
    <View
      row
      flex={full}
      backgroundColor={backgroundColor}
      {...props}
      paddingHorizontal={!icon || !circleIcon ? paddingHorizontal : 5}
      paddingVertical={5}
      center
      height={themeConfig.padding.medium * 2}
      borderRadius={themeConfig.radius.full}>
      {!!icon && !!circleIcon && (
        <IconWrapper
          width={themeConfig.padding.medium * 1.5}
          height={themeConfig.padding.medium * 1.5}
          marginRight={2}
          borderRadius={themeConfig.radius.full}
          backgroundColor={textColor}
          center
          icon={icon}
          color={backgroundColor}
        />
      )}
      <View center height={themeConfig.padding.medium * 1.5} row>
        {!!icon && !circleIcon && <IconWrapper icon={icon} color={textColor} />}
        <Text paddingHorizontal={5} variant={TextVariants.H4} color={textColor}>
          {label}
        </Text>
      </View>
    </View>
  );
};
