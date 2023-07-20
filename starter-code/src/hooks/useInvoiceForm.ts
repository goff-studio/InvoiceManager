import {useEffect, useState} from 'react';
import {
  Invoice,
  InvoiceAddress,
  InvoiceDraft,
  InvoiceFormEnum,
  InvoiceItem,
} from '../types/invoice';
import {
  calculateItemTotal,
  calculatePaymentDue,
  findFormErrors,
  totalSum,
} from '../utils/invoices';
import {initialInvoiceItemData} from '../configs/invoiceConfig';
import {useInvoices} from './useInvoices';
import {useNavigation} from '@react-navigation/native';

export const useInvoiceForm = (params: InvoiceDraft) => {
  const [formData, setFormData] = useState<InvoiceDraft>(params);
  const [errors, setErrors] = useState<string[]>([]);
  const {saveDraft, submitInvoice} = useInvoices();
  const navigation = useNavigation();

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

  const checkValidation = () => {
    // this is a very general validation that just check the
    const newErrors = findFormErrors(formData);
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  useEffect(() => {
    !!formData.paymentTerms &&
      formData.createdAt &&
      changeFormData(
        InvoiceFormEnum.paymentDue,
        calculatePaymentDue(formData.createdAt, formData.paymentTerms),
      );
  }, [formData.createdAt, formData.paymentTerms]);

  useEffect(() => {
    !!formData.items?.filter(item => item.total || 0).length &&
      changeFormData(InvoiceFormEnum.total, totalSum(formData.items));
  }, [formData.createdAt, formData.items, formData.paymentTerms]);

  const draftForm = () => {
    saveDraft(formData as Invoice);
    navigation.goBack();
  };

  const submitForm = () => {
    if (checkValidation()) {
      submitInvoice(formData as Invoice);
      navigation.goBack();
    }
  };

  return {
    formData,
    changeFormData,
    changeItemValues,
    addItem,
    deleteItem,
    errors,
    checkValidation,
    draftForm,
    submitForm,
  };
};
