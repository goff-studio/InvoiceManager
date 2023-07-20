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
  };

  const handleSubmit = () => {
    !!onSubmit && onSubmit();
  };

  return (
    <View
      {...props}
      row
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingHorizontal={themeConfig.padding.medium}
      paddingVertical={themeConfig.padding.semiSmall}>
      <Button
        paddingHorizontal={themeConfig.padding.xSmall}
        onPress={handleCancel}
        variant={ButtonVariants.SECONDARY}
        label={'Discard'}
      />
      <Button
        paddingHorizontal={themeConfig.padding.xSmall}
        onPress={handleDraft}
        variant={ButtonVariants.DARK}
        label={'Save as Draft'}
      />
      <Button
        paddingHorizontal={themeConfig.padding.xSmall}
        onPress={handleSubmit}
        variant={ButtonVariants.PRIMARY}
        label={'Save & Send'}
      />
    </View>
  );
};
