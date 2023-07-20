import React, {useMemo} from 'react';
import {Text, View} from './theme';
import {usePalette} from '../hooks/usePalette';
import {themeConfig} from '../configs/themeConfig';
import {TextVariants} from '../types/theme';
import {InvoiceStatus} from './InvoiceStatus';
import {InvoiceListItemProps, InvoiceStatuses} from '../types/invoice';
import {groupDigits} from '../utils/invoices';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {NavigationScreens} from '../types/navigation';
import {Card} from './theme/Card';

export const InvoiceListItem: React.FC<InvoiceListItemProps> = React.memo(
  ({invoice, ...props}) => {
    const {palette} = usePalette();
    const navigation = useNavigation();
    const handleNavigation = () => {
      navigation.navigate(
        invoice.status === InvoiceStatuses.Draft
          ? (NavigationScreens.INVOICE_FORM as never)
          : (NavigationScreens.INVOICE_DETAILS as never),
        invoice as never,
      );
    };

    const total = useMemo(() => {
      return groupDigits(invoice.total || 0);
    }, [invoice.total]);

    return (
      <Card onPress={handleNavigation} {...props}>
        <View row justifyContent={'space-between'}>
          <Text variant={TextVariants.H4}>
            <Text variant={TextVariants.H4} color={palette.textSecondary}>
              #
            </Text>
            {invoice.id}
          </Text>
          <Text variant={TextVariants.Body1}>{invoice.clientName}</Text>
        </View>
        <View
          row
          justifyContent={'space-between'}
          marginTop={themeConfig.padding.medium}>
          <View>
            <Text variant={TextVariants.Body1}>
              Due {moment(invoice.paymentDue).format('DD MMM YYYY')}
            </Text>
            <Text marginTop={8} variant={TextVariants.H3}>
              £ {total}
            </Text>
          </View>
          <InvoiceStatus status={invoice?.status} />
        </View>
      </Card>
    );
  },
);
