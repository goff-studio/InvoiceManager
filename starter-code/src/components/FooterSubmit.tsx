import React from 'react';
import {themeConfig, View} from './theme';
import {Button} from './theme/Button';
import {ButtonVariants} from '../types/theme';
import {useNavigation} from '@react-navigation/native';
import {FooterDraftSubmitProps} from '../types/invoice';

export const FooterSubmit: React.FC<FooterDraftSubmitProps> = ({
  onSubmit,
  ...props
}) => {
  const navigation = useNavigation();
  const handleCancel = () => navigation.goBack();

  return (
    <View
      {...props}
      row
      justifyContent={'flex-end'}
      paddingHorizontal={themeConfig.padding.medium}
      paddingVertical={themeConfig.padding.semiSmall}>
      <Button
        marginHorizontal={themeConfig.padding.medium}
        onPress={handleCancel}
        variant={ButtonVariants.SECONDARY}
        label={'Cancel'}
      />
      <Button
        onPress={onSubmit}
        variant={ButtonVariants.PRIMARY}
        label={'Save & Send'}
      />
    </View>
  );
};
