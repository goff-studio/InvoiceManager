import {useEffect, useState} from 'react';
import {
  InvoiceAddress,
  InvoiceDraft,
  InvoiceFormEnum,
  InvoiceItem,
} from '../types/invoice';
import {calculateItemTotal, calculatePaymentDue} from '../utils/invoices';
import {initialInvoiceItemData} from '../configs/invoiceConfig';

export const useInvoiceForm = (params: InvoiceDraft) => {
  const [formData, setFormData] = useState<InvoiceDraft>(params);
  const changeFormData = (
    property: InvoiceFormEnum,
    value: string | number | InvoiceAddress | InvoiceItem[],
  ) => {
    setFormData((prevState: InvoiceDraft) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const changeItemValues = (
    index: number,
    value: string,
    property: 'name' | 'quantity' | 'price',
  ) => {
    const newItems: InvoiceItem[] = [...(formData?.items || [])];
    const itemToUpdate = {...newItems[index], [property]: value};

    if (property !== 'name') {
      itemToUpdate.total = calculateItemTotal(
        itemToUpdate.quantity,
        itemToUpdate.price,
      );
    }
    newItems[index] = itemToUpdate;
    changeFormData(InvoiceFormEnum.items, newItems);
  };

  const addItem = () => {
    setFormData(prevState => ({
      ...prevState,
      [InvoiceFormEnum.items]: [
        ...(prevState?.items || []),
        initialInvoiceItemData,
      ],
    }));
  };

  const deleteItem = (index: number) => {
    const newItems: InvoiceItem[] = [...(formData?.items || [])];
    newItems.splice(index, 1);
    changeFormData(InvoiceFormEnum.items, newItems);
  };

  useEffect(() => {
    !!formData.paymentTerms &&
      formData.createdAt &&
      changeFormData(
        InvoiceFormEnum.paymentDue,
        calculatePaymentDue(formData.createdAt, formData.paymentTerms),
      );
  }, [formData.createdAt, formData.paymentTerms]);

  return {formData, changeFormData, changeItemValues, addItem, deleteItem};
};
