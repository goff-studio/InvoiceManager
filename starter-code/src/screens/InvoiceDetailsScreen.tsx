import React, {useState} from 'react';
import {Card, Screen, Text, themeConfig, View} from '../components/theme';
import {BackButton} from '../components/BackButton';
import {ButtonVariants, TextVariants} from '../types/theme';
import {InvoiceStatus} from '../components/InvoiceStatus';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NavigationParamsList, NavigationScreens} from '../types/navigation';
import {InvoiceDetailsItems} from '../components/InvoiceDetailsItems';
import {InvoiceDetailsGeneralInfo} from '../components/InvoiceDetailsGeneralInfo';
import {Button} from '../components/theme/Button';
import {InvoiceStatuses} from '../types/invoice';
import {useInvoices} from '../hooks/useInvoices';
import {ErrorConfirmation} from '../components/ErrorConfirmation';

type InvoiceDetailsScreen = RouteProp<
  NavigationParamsList,
  NavigationScreens.INVOICE_DETAILS
>;
export const InvoicesDetailsScreen = () => {
  const {params} = useRoute<InvoiceDetailsScreen>();
  const navigation = useNavigation();
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const handleOpenDelete = () => {
    setIsDeleteVisible(true);
  };
  const handleCloseDelete = () => setIsDeleteVisible(false);
  const {markAsPaid, invoices, deleteInvoice} = useInvoices();
  const invoice = invoices.find(item => item.id === params.id);
  const handleEdit = () =>
    navigation.navigate(
      NavigationScreens.INVOICE_FORM as never,
      params as never,
    );
  const handleDelete = () => {
    setIsDeleteVisible(false);
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
        onPress={handleOpenDelete}
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
        {!!params.items?.length && <InvoiceDetailsItems invoice={params} />}
      </Card>
      <ErrorConfirmation
        onSuccess={handleDelete}
        onRequestClose={handleCloseDelete}
        isVisible={isDeleteVisible}
      />
    </Screen>
  );
};
