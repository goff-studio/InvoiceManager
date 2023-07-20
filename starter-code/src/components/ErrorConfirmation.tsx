import React from 'react';
import {Card, ModalMenu, Text, themeConfig, View} from './theme';
import {
  ButtonVariants,
  ErrorConfirmationProps,
  TextVariants,
} from '../types/theme';
import {usePalette} from '../hooks/usePalette';
import {Button} from './theme/Button';

export const ErrorConfirmation: React.FC<ErrorConfirmationProps> = ({
  onSuccess,
  onRequestClose,
  ...props
}) => {
  const {palette} = usePalette();
  return (
    <ModalMenu {...props} onRequestClose={onRequestClose}>
      <Card>
        <Text
          color={palette.textSecondary}
          textAlign={'center'}
          variant={TextVariants.H2}>
          Attention
        </Text>
        <Text marginTop={themeConfig.padding.medium} variant={TextVariants.H4}>
          You are about to delete this invoice. This action cannot be undone
        </Text>
        <View
          row
          justifyContent={'space-between'}
          marginTop={themeConfig.padding.semiLarge}>
          <Button
            onPress={onRequestClose}
            variant={ButtonVariants.SECONDARY}
            label={'Cancel'}
          />
          <Button
            onPress={onSuccess}
            variant={ButtonVariants.ACCENT}
            label={'Yes, delete it!'}
          />
        </View>
      </Card>
    </ModalMenu>
  );
};
