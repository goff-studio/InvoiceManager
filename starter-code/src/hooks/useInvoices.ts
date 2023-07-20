import {useDispatch, useSelector} from 'react-redux';
import {MainStore} from '../types/store';
import {Invoice, InvoiceDraft, InvoiceStatuses} from '../types/invoice';
import {
  reduxEraseInvoices,
  reduxInvoiceDelete,
  reduxInvoiceDraft,
  reduxInvoiceEdit,
  reduxInvoiceSubmit,
  reduxLoadInvoices,
} from '../redux/actions/invoices';
import {reduxUpdateSettings} from '../redux/actions/settings';

export const useInvoices = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state: MainStore) => state.invoicesReducer);

  const editInvoice = (data: InvoiceDraft) => dispatch(reduxInvoiceEdit(data));

  const saveDraft = (data: InvoiceDraft) => dispatch(reduxInvoiceDraft(data));

  const submitInvoice = (data: Invoice) => dispatch(reduxInvoiceSubmit(data));

  const deleteInvoice = (data: InvoiceDraft) =>
    dispatch(reduxInvoiceDelete(data));

  const markAsPaid = (id: string) => {
    editInvoice({id, status: InvoiceStatuses.Paid});
  };

  const populateInvoices = (data: InvoiceDraft[]) => {
    dispatch(reduxLoadInvoices(data));
    dispatch(reduxUpdateSettings({dataPopulated: true}));
  };
  const eraseAllInvoices = () => dispatch(reduxEraseInvoices());

  return {
    invoices,
    editInvoice,
    saveDraft,
    submitInvoice,
    deleteInvoice,
    populateInvoices,
    eraseAllInvoices,
    markAsPaid,
  };
};
