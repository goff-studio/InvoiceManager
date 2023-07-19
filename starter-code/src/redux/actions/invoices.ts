import {
  Invoice,
  InvoiceActionTypes,
  InvoiceDataReduxActions,
  InvoiceDraft,
  InvoiceReduxActions,
} from '../../types/invoice';

export const reduxInvoiceDraft = (data: InvoiceDraft): InvoiceReduxActions => ({
  type: InvoiceActionTypes.INVOICE_SUBMIT,
  data,
});

export const reduxInvoiceEdit = (data: InvoiceDraft): InvoiceReduxActions => ({
  type: InvoiceActionTypes.INVOICE_EDIT,
  data,
});

export const reduxInvoiceSubmit = (data: Invoice): InvoiceReduxActions => ({
  type: InvoiceActionTypes.INVOICE_SUBMIT,
  data,
});

export const reduxInvoiceDelete = (
  data: InvoiceDraft,
): InvoiceReduxActions => ({
  type: InvoiceActionTypes.INVOICE_DELETE,
  data,
});

export const reduxLoadInvoices = (
  data: InvoiceDraft[],
): InvoiceDataReduxActions => ({
  type: InvoiceActionTypes.INVOICES_LOAD_DATA,
  data,
});

export const reduxEraseInvoices = (): InvoiceDataReduxActions => ({
  type: InvoiceActionTypes.INVOICES_LOAD_DATA,
  data: [],
});
