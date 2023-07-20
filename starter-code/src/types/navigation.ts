import {Invoice, InvoiceDraft} from './invoice';

export enum NavigationScreens {
  INVOICES = 'Invoices',
  INVOICE_DETAILS = 'InvoiceDetails',
  INVOICE_FORM = 'InvoiceForm',
}

export type NavigationParamsList = {
  [NavigationScreens.INVOICES]: undefined;
  [NavigationScreens.INVOICE_DETAILS]: Invoice;
  [NavigationScreens.INVOICE_FORM]: InvoiceDraft;
};
