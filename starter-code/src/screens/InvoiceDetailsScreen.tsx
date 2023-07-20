import React from 'react';
import {Screen, Text, themeConfig, View} from '../components/theme';
import {BackButton} from '../components/BackButton';
import {Card} from '../components/theme';
import {ButtonVariants, TextVariants} from '../types/theme';
import {InvoiceStatus} from '../components/InvoiceStatus';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NavigationParamsList, NavigationScreens} from '../types/navigation';
import {InvoiceDetailsItems} from '../components/InvoiceDetailsItems';
import {InvoiceDetailsGeneralInfo} from '../components/InvoiceDetailsGeneralInfo';
import {Button} from '../components/theme/Button';
import {InvoiceStatuses} from '../types/invoice';
import {useInvoices} from '../hooks/useInvoices';

type InvoiceDetailsScreen = RouteProp<
  NavigationParamsList,
  NavigationScreens.INVOICE_DETAILS
>;
export const InvoicesDetailsScreen = () => {
  const {params} = useRoute<InvoiceDetailsScreen>();
  const navigation = useNavigation();

  const {markAsPaid, invoices, deleteInvoice} = useInvoices();
  const invoice = invoices.find(item => item.id === params.id);
  const handleEdit = () =>
    navigation.navigate(
      NavigationScreens.INVOICE_FORM as never,
      params as never,
    );
  const handleDelete = () => {
    deleteInvoice(params);
    navigation.goBack();
  };
  const handlePaidPress = () => markAsPaid(params.id);
  const renderFooter = (
    <View
      row
      justifyContent={'space-between'}
      paddingHorizontal={themeConfig.padding.medium}
      paddingVertical={themeConfig.padding.semiSmall}>
      <Button
        onPress={handleEdit}
        variant={ButtonVariants.SECONDARY}
        label={'Edit'}
      />
      <Button
        onPress={handleDelete}
        variant={ButtonVariants.ACCENT}
        label={'Delete'}
      />
      <Button
        onPress={handlePaidPress}
        variant={ButtonVariants.PRIMARY}
        label={'Mark as Paid'}
      />
    </View>
  );
  return (
    <Screen
      scrollable
      footer={invoice?.status !== InvoiceStatuses.Paid && renderFooter}>
      <BackButton />
      <Card row justifyContent={'space-between'} alignItems={'center'}>
        <Text variant={TextVariants.Body1}>Status</Text>
        <InvoiceStatus status={invoice?.status || InvoiceStatuses.Draft} />
      </Card>
      <Card marginVertical={themeConfig.padding.semiSmall}>
        <InvoiceDetailsGeneralInfo invoice={params} />
        <InvoiceDetailsItems invoice={params} />
      </Card>
    </Screen>
  );
};
