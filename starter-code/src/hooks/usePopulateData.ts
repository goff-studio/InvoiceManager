import {useEffect} from 'react';
import {useSettings} from './useSettings';
import {useInvoices} from './useInvoices';
import json from '../../data.json';
import {InvoiceDraft} from '../types/invoice';

export const usePopulateData = () => {
  const {data} = useSettings();
  const {invoices, populateInvoices} = useInvoices();
  useEffect(() => {
    if (data.dataPopulated || !!invoices.length) {
      return;
    }
    populateInvoices(json as InvoiceDraft[]);
  }, [data.dataPopulated, invoices.length, populateInvoices]);
};
