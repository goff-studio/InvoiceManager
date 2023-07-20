import React from 'react';
import {TextVariants, ViewProps} from '../types/theme';
import {Text, themeConfig, View} from './theme';
import EmptyStateIllustration from '../assets/illustration-empty.svg';

export const EmptyState: React.FC<ViewProps> = ({
  paddingVertical = themeConfig.padding.semiLarge,
}) => {
  return (
    <View center paddingVertical={paddingVertical}>
      <EmptyStateIllustration />
      <Text
        marginVertical={themeConfig.padding.semiLarge}
        variant={TextVariants.H2}>
        There is nothing here
      </Text>
      <Text
        paddingHorizontal={themeConfig.padding.semiLarge}
        textAlign={'center'}>
        Create an invoice by clicking the{' '}
        <Text variant={TextVariants.H4}>New</Text> Button and get started
      </Text>
    </View>
  );
};
