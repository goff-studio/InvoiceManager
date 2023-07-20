import React from 'react';
import {InvoiceDetailsProps} from '../types/invoice';
import {Text, themeConfig, View} from './theme';
import {groupDigits} from '../utils/invoices';
import {usePalette} from '../hooks/usePalette';
import {TextVariants} from '../types/theme';

export const InvoiceDetailsItems: React.FC<InvoiceDetailsProps> = ({
  invoice,
  marginTop = themeConfig.padding.semiLarge,
}) => {
  const {palette} = usePalette();
  const renderItems = () =>
    invoice.items?.map((item, index) => (
      <View
        marginTop={index ? themeConfig.padding.medium : undefined}
        row
        justifyContent={'space-between'}
        key={'invoice-item-' + index}
        alignItems={'center'}>
        <View>
          <Text variant={TextVariants.H4}>{item.name}</Text>
          <Text
            variant={TextVariants.H4}
            marginTop={themeConfig.padding.xxSmall}
            color={palette.textSecondary}>
            {item.quantity} x £ {groupDigits(item.price)}
          </Text>
        </View>
        <Text variant={TextVariants.H4}>£ {groupDigits(item.total)}</Text>
      </View>
    ));
  return (
    <View
      marginTop={marginTop}
      borderRadius={themeConfig.radius.xSmall}
      overflow={'hidden'}>
      <View
        paddingHorizontal={themeConfig.padding.medium}
        paddingVertical={themeConfig.padding.medium}
        backgroundColor={palette.backgroundDisabled}>
        {renderItems()}
      </View>
      <View
        backgroundColor={themeConfig.colors.dark4}
        row
        paddingVertical={themeConfig.padding.medium}
        paddingHorizontal={themeConfig.padding.medium}
        justifyContent={'space-between'}>
        <Text color={themeConfig.colors.light4}>Amount Due</Text>
        <Text color={themeConfig.colors.light4} variant={TextVariants.H2}>
          £ {groupDigits(invoice.total)}
        </Text>
      </View>
    </View>
  );
};
