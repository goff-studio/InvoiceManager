import {ViewProps} from './theme';

export enum InvoiceStatuses {
  Draft = 'draft',
  Pending = 'pending',
  Paid = 'paid',
}

export interface InvoiceAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export enum InvoiceFormEnum {
  id = 'id',
  createdAt = 'createdAt',
  paymentDue = 'paymentDue',
  description = 'description',
  paymentTerms = 'paymentTerms',
  clientName = 'clientName',
  clientEmail = 'clientEmail',
  total = 'total',
  senderAddress = 'senderAddress',
  clientAddress = 'clientAddress',
  items = 'items',
}

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatuses;
  senderAddress: InvoiceAddress;
  clientAddress: InvoiceAddress;
  items: InvoiceItem[];
  total: number;
}

export type InvoiceDraft = Partial<Invoice> & Required<Pick<Invoice, 'id'>>;

export enum InvoiceActionTypes {
  INVOICE_EDIT = 'INVOICE_EDIT',
  INVOICE_SUBMIT = 'INVOICE_SUBMIT',
  INVOICE_DELETE = 'INVOICE_DELETE',
  INVOICES_LOAD_DATA = 'INVOICES_LOAD_DATA',
}

export interface InvoiceReduxActions {
  type: InvoiceActionTypes;
  data: Invoice | InvoiceDraft;
}
export interface InvoiceDataReduxActions {
  type: InvoiceActionTypes;
  data: InvoiceDraft[];
}

export interface InvoiceListItemProps extends ViewProps {
  invoice: InvoiceDraft;
}
export interface InvoiceDetailsProps extends ViewProps {
  invoice: Invoice;
}
export interface InvoiceStatusProps extends ViewProps {
  status?: InvoiceStatuses;
}

export interface InvoicesListHeaderProps extends ViewProps {
  total: number;
  onFilterSelected: (filter: string | undefined) => unknown;
  initialFilter?: string;
}

export interface InvoiceFormAddressProps extends ViewProps {
  onChange: (
    type: InvoiceFormEnum.senderAddress | InvoiceFormEnum.clientAddress,
    info: InvoiceAddress,
  ) => unknown;
  type: InvoiceFormEnum.senderAddress | InvoiceFormEnum.clientAddress;
  value?: InvoiceAddress;
}

export interface InvoiceFormTermsProps extends ViewProps {
  onChange: (
    type: InvoiceFormEnum.paymentTerms,
    value: string | number,
  ) => unknown;
  invoice: InvoiceDraft;
}

export type TermsOptionType = {
  label: string;
  value: number;
};

export interface InvoiceFormItemsProps extends ViewProps {
  items: InvoiceItem[];
  onAddPress: () => unknown;
  onDeletePress: (i: number) => unknown;
  onChange: (
    index: number,
    value: string,
    property: 'name' | 'quantity' | 'price',
  ) => unknown;
}
