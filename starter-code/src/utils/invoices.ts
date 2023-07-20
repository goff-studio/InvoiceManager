import moment from 'moment/moment';
import {dateConfig} from '../configs/dateConfig';
import {
  InvoiceAddress,
  InvoiceDraft,
  InvoiceFormEnum,
  InvoiceItem,
} from '../types/invoice';
import {initialInvoiceAddress} from '../configs/invoiceConfig';

export function generateId(): string {
  const randomLetters = Array.from({length: 2}, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26)),
  );
  const randomNumbers = Array.from({length: 4}, () =>
    Math.floor(Math.random() * 10).toString(),
  );

  return randomLetters.join('') + randomNumbers.join('');
}

export const capitalizeFirstChar = (input: string): string => {
  if (!input) {
    return '';
  }

  const firstChar = input.charAt(0).toUpperCase();
  const restOfText = input.slice(1).toLowerCase();

  return firstChar + restOfText;
};
export const groupDigits = (number: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const isValidDate = (dateString: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return false;
  }

  const year = Number(dateString.slice(0, 4));
  const month = Number(dateString.slice(5, 7));
  const day = Number(dateString.slice(8, 10));

  // Validate year, month, and day ranges
  if (year < 1000 || year > 9999) {
    return false;
  }
  if (month < 1 || month > 12) {
    return false;
  }
  if (day < 1 || day > new Date(year, month, 0).getDate()) {
    return false;
  }

  return true;
};

export const calculatePaymentDue = (date: string, terms: number) => {
  // moment will validate the date string with enforced format: 'YYYY-MM-DD'
  const createdAt = moment(date, dateConfig.storedDateFormat);
  return createdAt.add(terms, 'days').format(dateConfig.storedDateFormat);
};

export const calculateItemTotal = (
  qty: number | string,
  price: number | string,
) => {
  const parsedQty = typeof qty === 'number' ? qty : parseInt(qty.trim(), 10);
  const parsedPrice =
    typeof price === 'number' ? price : parseFloat(price.trim());

  if (isNaN(parsedQty) || isNaN(parsedPrice)) {
    return 0;
  }

  return parsedQty * parsedPrice;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export const findFormErrors = (formData: InvoiceDraft) => {
  const newErrors: string[] = [];

  const requiredFields = Object.keys(InvoiceFormEnum) as Array<
    keyof InvoiceDraft
  >;
  requiredFields.forEach(field => {
    if (!formData[field]) {
      newErrors.push(field);
    }
  });

  const addressKeys = Object.keys(initialInvoiceAddress) as Array<
    keyof InvoiceAddress
  >;

  // To check is the address information for sender and client entered correctly
  [InvoiceFormEnum.senderAddress, InvoiceFormEnum.clientAddress].forEach(
    partyKey => {
      addressKeys.forEach(key => {
        const addressData = formData?.[partyKey] as InvoiceAddress | undefined;
        if (!addressData?.[key]) {
          newErrors.push(partyKey + '-' + key);
        }
      });
    },
  );

  // to check the content of the items
  if (!formData.items?.length) {
    newErrors.push(InvoiceFormEnum.items);
  } else {
    formData.items.forEach((item, index) => {
      if (!item?.price || !item?.name || !item?.quantity) {
        newErrors.push(InvoiceFormEnum.items + '-' + index);
      }
    });
  }

  if (formData.clientEmail && !isValidEmail(formData.clientEmail)) {
    newErrors.push(InvoiceFormEnum.clientEmail);
  }
  return newErrors;
};

export const totalSum = (items: InvoiceItem[]) => {
  return items.reduce((acc, item) => {
    // 'as any' is used to avoid type checking for NaN
    const totalValue = parseFloat(item.total as any);

    return acc + (isNaN(totalValue) ? 0 : totalValue);
  }, 0);
};
