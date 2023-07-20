import React from 'react';
import {themeConfig, View} from './theme';
import {Button} from './theme/Button';
import {ButtonVariants} from '../types/theme';
import {useNavigation} from '@react-navigation/native';
import {FooterDraftSubmitProps} from '../types/invoice';

export const FooterDraftSubmit: React.FC<FooterDraftSubmitProps> = ({
  onDraft,
  onSubmit,
  ...props
}) => {
  const navigation = useNavigation();
  const handleCancel = () => navigation.goBack();

  const handleDraft = () => {
    !!onDraft && onDraft();
    navigation.goBack();
  };

  const handleSubmit = () => {
    !!onSubmit && onSubmit();
    navigation.goBack();
  };

  return (
    <View
      {...props}
      row
      justifyContent={'space-between'}
      paddingHorizontal={themeConfig.padding.medium}
      paddingVertical={themeConfig.padding.semiSmall}>
      <Button
        onPress={handleCancel}
        variant={ButtonVariants.SECONDARY}
        label={'Discard'}
      />
      <Button
        onPress={handleDraft}
        variant={ButtonVariants.DARK}
        label={'Save as Draft'}
      />
      <Button
        onPress={handleSubmit}
        variant={ButtonVariants.PRIMARY}
        label={'Submit & Send'}
      />
    </View>
  );
};
