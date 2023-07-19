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
