import {
  Invoice,
  InvoiceActionTypes,
  InvoiceDataReduxActions,
  InvoiceDraft,
  InvoiceReduxActions,
} from '../../types/invoice';

export const invoicesReducer = (
  state: InvoiceDraft[] = [],
  action: InvoiceReduxActions | InvoiceDataReduxActions,
): InvoiceDraft[] => {
  switch (action.type) {
    case InvoiceActionTypes.INVOICES_LOAD_DATA:
      return Array.isArray(action.data) ? action.data : state;

    case InvoiceActionTypes.INVOICE_DELETE:
      return (action.data as InvoiceDraft)?.id
        ? state.filter(
            invoice => invoice.id !== (action.data as InvoiceDraft).id,
          )
        : state;

    case InvoiceActionTypes.INVOICE_EDIT:
      if (!(action.data as Invoice)?.id || Array.isArray(action.data)) {
        return state;
      }
      const invoices: InvoiceDraft[] = [...state];
      const invoiceIndex: number = invoices.findIndex(
        (invoice: InvoiceDraft) =>
          invoice.id === (action.data as InvoiceDraft).id,
      );
      invoices[invoiceIndex] = {...invoices[invoiceIndex], ...action.data};
      return invoices;

    case InvoiceActionTypes.INVOICE_SUBMIT:
      return (action.data as InvoiceDraft | Invoice)?.id
        ? [
            ...state.filter(
              item => item.id !== (action.data as InvoiceDraft | Invoice).id,
            ),
            action.data as InvoiceDraft | Invoice,
          ]
        : state;
    default:
      return state;
  }
};
