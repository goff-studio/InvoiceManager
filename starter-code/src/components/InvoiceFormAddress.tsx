import React from 'react';
import {TextInput, themeConfig, View} from './theme';
import {styles} from '../screens/InvoiceFormScreen';
import {InvoiceFormAddressProps} from '../types/invoice';
import {initialInvoiceAddress} from '../configs/invoiceConfig';

export const InvoiceFormAddress: React.FC<InvoiceFormAddressProps> = ({
  onChange,
  type,
  value,
  ...props
}) => {
  const handleChange = (inputValue: string, property: string) => {
    onChange(type, {
      ...(value || initialInvoiceAddress),
      [property]: inputValue,
    });
  };
  return (
    <View {...props}>
      <TextInput
        onChangeText={t => handleChange(t, 'street')}
        label={'Street Address'}
        value={value?.street}
      />
      <View row justifyContent={'space-between'}>
        <TextInput
          onChangeText={t => handleChange(t, 'city')}
          label={'City'}
          containerStyle={styles.flex}
          value={value?.city}
        />
        <View width={themeConfig.padding.medium} height={1} />
        <TextInput
          onChangeText={t => handleChange(t, 'postCode')}
          label={'Post Code'}
          containerStyle={styles.flex}
          value={value?.postCode}
        />
      </View>
      <TextInput
        onChangeText={t => handleChange(t, 'country')}
        label={'Country'}
        value={value?.country}
      />
    </View>
  );
};
