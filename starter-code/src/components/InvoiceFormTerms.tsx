import React from 'react';
import {DropDown} from './theme';
import {
  InvoiceFormEnum,
  InvoiceFormTermsProps,
  TermsOptionType,
} from '../types/invoice';
import {invoiceTermsOptions} from '../configs/invoiceConfig';

export const InvoiceFormTerms: React.FC<InvoiceFormTermsProps> = ({
  onChange,
  invoice,
}) => {
  const handleChange = (label: string | undefined) => {
    const option: TermsOptionType | undefined = invoiceTermsOptions.find(
      opt => opt.label === label,
    );

    if (option?.value) {
      onChange(InvoiceFormEnum.paymentTerms, option.value);
    }
  };
  const initialValue = invoiceTermsOptions.find(
    opt => opt.value === invoice?.paymentTerms,
  );
  return (
    <DropDown
      initialValue={initialValue?.label || undefined}
      placeholder={'Please select'}
      label={'Payment Terms'}
      items={invoiceTermsOptions.map(opt => opt.label)}
      onChange={handleChange}
    />
  );
};
