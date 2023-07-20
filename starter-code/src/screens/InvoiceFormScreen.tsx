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
import {FooterDraftSubmit} from '../components/FooterDraftSubmit';
import {initialInvoiceAddress} from '../configs/invoiceConfig';
import {FooterSubmit} from '../components/FooterSubmit';

type InvoiceFormScreenProps = RouteProp<
  NavigationParamsList,
  NavigationScreens.INVOICE_FORM
>;
export const InvoicesFormScreen = () => {
  const {params} = useRoute<InvoiceFormScreenProps>();
  const {
    formData,
    changeFormData,
    changeItemValues,
    addItem,
    deleteItem,
    errors,
    draftForm,
    submitForm,
  } = useInvoiceForm(params);
  const {palette} = usePalette();
  console.info(errors);

  const isEdit = Object.keys(params).length > 1;
  const senderAddressErrors = errors.filter(item =>
    item.includes(InvoiceFormEnum.senderAddress),
  );
  const clientAddressErrors = errors.filter(item =>
    item.includes(InvoiceFormEnum.clientAddress),
  );
  const itemsErrors = errors.filter(item =>
    item.includes(InvoiceFormEnum.items),
  );

  const renderDraftFooter = (
    <FooterDraftSubmit onDraft={draftForm} onSubmit={submitForm} />
  );
  const renderFooter = <FooterSubmit onSubmit={submitForm} />;

  return (
    <Screen scrollable footer={isEdit ? renderFooter : renderDraftFooter}>
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
        errors={senderAddressErrors}
        onChange={changeFormData}
        value={formData?.senderAddress || initialInvoiceAddress}
        type={InvoiceFormEnum.senderAddress}
      />
      <Text
        variant={TextVariants.H4}
        color={themeConfig.colors.primary2}
        marginVertical={themeConfig.padding.semiSmall}>
        Bill to
      </Text>
      <TextInput
        error={errors.includes(InvoiceFormEnum.clientName)}
        placeholder={'John Smith'}
        value={formData[InvoiceFormEnum.clientName]}
        label={"Client's Name"}
        onChangeText={t => changeFormData(InvoiceFormEnum.clientName, t)}
      />
      <TextInput
        error={errors.includes(InvoiceFormEnum.clientEmail)}
        placeholder={'info@example.com'}
        value={formData[InvoiceFormEnum.clientEmail]}
        label={"Client's Email"}
        onChangeText={t => changeFormData(InvoiceFormEnum.clientEmail, t)}
      />
      <InvoiceFormAddress
        errors={clientAddressErrors}
        onChange={changeFormData}
        value={formData?.clientAddress || initialInvoiceAddress}
        type={InvoiceFormEnum.clientAddress}
      />
      <Calendar
        label={'Issue date'}
        error={errors.includes(InvoiceFormEnum.createdAt)}
        placeholder={'Please select'}
        value={formData.createdAt}
        onChange={(date: string) =>
          changeFormData(InvoiceFormEnum.createdAt, date)
        }
      />
      <InvoiceFormTerms
        onChange={changeFormData}
        invoice={formData}
        error={errors.includes(InvoiceFormEnum.paymentTerms)}
      />
      <TextInput
        placeholder={'App development'}
        error={errors.includes(InvoiceFormEnum.description)}
        label={'Project Description'}
        value={formData[InvoiceFormEnum.description]}
        onChangeText={t => changeFormData(InvoiceFormEnum.description, t)}
      />
      <InvoiceFormItems
        errors={itemsErrors}
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
