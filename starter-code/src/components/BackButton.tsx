import React from 'react';
import {Text, themeConfig, View} from './theme';
import {TextVariants} from '../types/theme';
import LeftArrow from '../assets/icon-arrow-left.svg';
import {useNavigation} from '@react-navigation/native';

export const BackButton: React.FC = () => {
  const navigation = useNavigation();
  const handleBack = () => navigation.goBack();
  return (
    <View
      onPress={handleBack}
      row
      paddingVertical={themeConfig.padding.semiLarge}>
      <LeftArrow />
      <Text marginLeft={themeConfig.padding.medium} variant={TextVariants.H4}>
        Go back
      </Text>
    </View>
  );
};
