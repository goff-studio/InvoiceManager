import {InvoiceAddress, TermsOptionType} from '../types/invoice';

export const initialInvoiceAddress: InvoiceAddress = {
  street: '',
  city: '',
  postCode: '',
  country: '',
};

export const invoiceTermsOptions: TermsOptionType[] = [
  {label: 'Next Day', value: 1},
  {label: 'Next 7 Days', value: 7},
  {label: 'Next 30 Days', value: 30},
];

export const initialInvoiceItemData = {
  name: '',
  price: 0.0,
  quantity: 0,
  total: 0.0,
};
