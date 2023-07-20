import React from 'react';
import {Screen, Text, TextInput, themeConfig} from '../components/theme';
import {TextVariants} from '../types/theme';
import {BackButton} from '../components/BackButton';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NavigationParamsList, NavigationScreens} from '../types/navigation';
import {StyleSheet} from 'react-native';
import {usePalette} from '../hooks/usePalette';
import {InvoiceFormAddress} from '../components/InvoiceFormAddress';
import {InvoiceFormEnum} from '../types/invoice';
import {InvoiceFormTerms} from '../components/InvoiceFormTerms';
import {useInvoiceForm} from '../hooks/useInvoiceForm';
import {InvoiceFormItems} from '../components/InvoiceFormItems';
import {Calendar} from '../components/theme/Calendar';

type InvoiceFormScreenProps = RouteProp<
  NavigationParamsList,
  NavigationScreens.INVOICE_FORM
>;
export const InvoicesFormScreen = () => {
  const {params} = useRoute<InvoiceFormScreenProps>();
  const {formData, changeFormData, changeItemValues, addItem, deleteItem} =
    useInvoiceForm(params);
  const {palette} = usePalette();
  const isEdit = Object.keys(params).length > 1;

  return (
    <Screen scrollable>
      <BackButton />
      {!isEdit && <Text variant={TextVariants.H2}>New Invoice</Text>}
      {isEdit && (
        <Text variant={TextVariants.H2}>
          <Text variant={TextVariants.H2} color={palette.textSecondary}>
            #
          </Text>
          {params.id}
        </Text>
      )}
      <Text
        variant={TextVariants.H4}
        color={themeConfig.colors.primary2}
        marginVertical={themeConfig.padding.semiSmall}>
        Bill from
      </Text>
      <InvoiceFormAddress
        onChange={changeFormData}
        value={formData?.senderAddress}
        type={InvoiceFormEnum.senderAddress}
      />
      <Text
        variant={TextVariants.H4}
        color={themeConfig.colors.primary2}
        marginVertical={themeConfig.padding.semiSmall}>
        Bill to
      </Text>
      <TextInput
        placeholder={'John Smith'}
        value={formData[InvoiceFormEnum.clientName]}
        label={"Client's Name"}
        onChangeText={t => changeFormData(InvoiceFormEnum.clientName, t)}
      />
      <TextInput
        placeholder={'info@example.com'}
        value={formData[InvoiceFormEnum.clientEmail]}
        label={"Client's Email"}
        onChangeText={t => changeFormData(InvoiceFormEnum.clientEmail, t)}
      />
      <InvoiceFormAddress
        onChange={changeFormData}
        value={formData?.clientAddress}
        type={InvoiceFormEnum.senderAddress}
      />
      <Calendar
        placeholder={'Please select'}
        value={formData.createdAt}
        onChange={(date: string) =>
          changeFormData(InvoiceFormEnum.createdAt, date)
        }
      />
      <InvoiceFormTerms onChange={changeFormData} invoice={formData} />
      <TextInput
        label={'Project Description'}
        value={formData[InvoiceFormEnum.description]}
        onChangeText={t => changeFormData(InvoiceFormEnum.description, t)}
      />
      <InvoiceFormItems
        items={formData?.items || []}
        onChange={changeItemValues}
        onAddPress={addItem}
        onDeletePress={deleteItem}
      />
    </Screen>
  );
};
export const styles = StyleSheet.create({
  flex: {flex: 1},
});
