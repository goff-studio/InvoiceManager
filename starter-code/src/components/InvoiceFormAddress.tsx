import React from 'react';
import {TextInput, themeConfig, View} from './theme';
import {styles} from '../screens/InvoiceFormScreen';
import {InvoiceFormAddressProps} from '../types/invoice';
import {initialInvoiceAddress} from '../configs/invoiceConfig';

export const InvoiceFormAddress: React.FC<InvoiceFormAddressProps> = ({
  onChange,
  type,
  value,
  errors,
  ...props
}) => {
  const handleChange = (inputValue: string, property: string) => {
    onChange(type, {
      ...(value || initialInvoiceAddress),
      [property]: inputValue,
    });
  };
  const fieldsErrors = errors
    ?.filter(error => error.includes('-'))
    .map(error => error.split('-')[1]);
  return (
    <View {...props}>
      <TextInput
        error={fieldsErrors?.includes('street')}
        placeholder={'Arch Street Hesperia'}
        onChangeText={t => handleChange(t, 'street')}
        label={'Street Address'}
        value={value?.street}
      />
      <View row justifyContent={'space-between'}>
        <TextInput
          error={fieldsErrors?.includes('city')}
          placeholder={'CA'}
          onChangeText={t => handleChange(t, 'city')}
          label={'City'}
          containerStyle={styles.flex}
          value={value?.city}
        />
        <View width={themeConfig.padding.medium} height={1} />
        <TextInput
          error={fieldsErrors?.includes('postCode')}
          placeholder={'92345'}
          onChangeText={t => handleChange(t, 'postCode')}
          label={'Post Code'}
          containerStyle={styles.flex}
          value={value?.postCode}
        />
      </View>
      <TextInput
        error={fieldsErrors?.includes('country')}
        placeholder={'United States'}
        onChangeText={t => handleChange(t, 'country')}
        label={'Country'}
        value={value?.country}
      />
    </View>
  );
};
