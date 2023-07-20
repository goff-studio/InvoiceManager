import React from 'react';
import {InvoiceStatuses, InvoiceStatusProps} from '../types/invoice';
import {Text, themeConfig, View} from './theme';
import {TextVariants} from '../types/theme';
import {capitalizeFirstChar} from '../utils/invoices';
import {convertToRgba} from '../utils/theme';
import {usePalette} from '../hooks/usePalette';

export const InvoiceStatus: React.FC<InvoiceStatusProps> = ({
  status,
  ...props
}) => {
  const {palette} = usePalette();
  const color =
    status === InvoiceStatuses.Paid
      ? themeConfig.colors.success
      : status === InvoiceStatuses.Pending
      ? themeConfig.colors.warning
      : palette.textPrimary;
  return (
    <View
      {...props}
      row
      alignItems={'center'}
      paddingVertical={themeConfig.padding.small}
      borderRadius={themeConfig.radius.xSmall}
      center
      backgroundColor={convertToRgba(color, 0.1)}
      width={themeConfig.dimension.screenWidth / 3.5}>
      <View
        width={10}
        height={10}
        marginRight={8}
        borderRadius={10}
        backgroundColor={color}
      />
      <Text variant={TextVariants.H4} color={color}>
        {capitalizeFirstChar((status as string) || InvoiceStatuses.Draft)}
      </Text>
    </View>
  );
};
