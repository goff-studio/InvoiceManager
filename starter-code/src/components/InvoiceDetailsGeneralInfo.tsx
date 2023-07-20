import React from 'react';
import {InvoiceDetailsProps} from '../types/invoice';
import {Text, themeConfig, View} from './theme';
import {TextVariants} from '../types/theme';
import moment from 'moment/moment';
import {usePalette} from '../hooks/usePalette';
import {StyleSheet} from 'react-native';
import {dateConfig} from '../configs/dateConfig';

export const InvoiceDetailsGeneralInfo: React.FC<InvoiceDetailsProps> = ({
  invoice,
  ...props
}) => {
  const {palette} = usePalette();
  return (
    <View {...props}>
      <Text variant={TextVariants.H4}>
        <Text variant={TextVariants.H4} color={palette.textSecondary}>
          #
        </Text>
        {invoice.id}
      </Text>
      <Text marginTop={themeConfig.padding.xxSmall}>{invoice.description}</Text>
      <Text
        style={styles.paragraph}
        marginTop={themeConfig.padding.semiLarge}
        variant={TextVariants.Body1}>
        {`${invoice.senderAddress?.street || '-'}\n${
          invoice.senderAddress?.country || '-'
        }\n${invoice.senderAddress?.postCode || '-'}\n${
          invoice.senderAddress?.city || '-'
        }`}
      </Text>
      <View row marginTop={themeConfig.padding.semiLarge}>
        <View flex>
          <Text>Invoice Date</Text>
          <Text
            marginTop={themeConfig.padding.xxSmall}
            variant={TextVariants.H3}>
            {invoice.createdAt
              ? moment(invoice.createdAt).format(dateConfig.renderedDateFormat)
              : '-'}
          </Text>
          <Text marginTop={themeConfig.padding.semiLarge}>Payment Due</Text>
          <Text
            marginTop={themeConfig.padding.xxSmall}
            variant={TextVariants.H3}>
            {invoice.paymentDue
              ? moment(invoice.paymentDue).format(dateConfig.renderedDateFormat)
              : '-'}
          </Text>
        </View>
        <View flex>
          <Text>Bill to</Text>
          <Text
            marginTop={themeConfig.padding.xxSmall}
            variant={TextVariants.H3}>
            {invoice.clientName || '-'}
          </Text>
          <Text
            style={styles.paragraph}
            marginTop={themeConfig.padding.xSmall}
            variant={TextVariants.Body1}>
            {`${invoice.clientAddress?.street || '-'}\n${
              invoice.clientAddress?.country || '-'
            }\n${invoice.clientAddress?.postCode || '-'}\n${
              invoice.clientAddress?.city || '-'
            }`}
          </Text>
        </View>
      </View>
      {invoice.clientEmail && (
        <>
          <Text marginTop={themeConfig.padding.semiLarge}>Send to</Text>
          <Text
            variant={TextVariants.H3}
            marginTop={themeConfig.padding.xxSmall}>
            {invoice.clientEmail}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: {lineHeight: 20},
});
