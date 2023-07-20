import {
  calculateItemTotal,
  calculatePaymentDue,
  capitalizeFirstChar,
  findFormErrors,
  generateId,
  groupDigits,
  isValidDate,
  isValidEmail,
} from '../utils/invoices';
import {describe, expect, test} from '@jest/globals';
import {InvoiceActionTypes, InvoiceDraft} from '../types/invoice';
import {
  reduxInvoiceDelete,
  reduxInvoiceDraft,
  reduxInvoiceEdit,
} from '../redux/actions/invoices';
import {legacy_createStore as createStore} from 'redux';
import {rootReducer} from '../redux/reducers';
import {dateConfig} from '../configs/dateConfig';
import sample from '../../data.json';

describe('generateId', () => {
  test('generates a string with 2 random uppercase letters followed by 4 random numbers', () => {
    const randomString = generateId();
    expect(randomString).toMatch(/^[A-Z]{2}[0-9]{4}$/);
  });
});

describe('CRUD functionality of invoices', () => {
  const store = createStore(rootReducer);
  const id = generateId();
  const draftInvoice: InvoiceDraft = {
    id,
    createdAt: '2021-08-18',
    paymentDue: '2021-08-25',
    description: 'Sample invoice',
    clientName: 'John Doe',
  };
  test('creates a draft invoice', () => {
    const dataToDispatch = reduxInvoiceDraft(draftInvoice);
    store.dispatch(dataToDispatch);

    const {invoicesReducer} = store.getState();
    const storedInvoice = invoicesReducer?.find(
      (item: InvoiceDraft) => item.id === id,
    );
    expect(dataToDispatch.type).toEqual(InvoiceActionTypes.INVOICE_SUBMIT);
    expect(dataToDispatch.data.id).toEqual(id);
    expect(storedInvoice?.id).toEqual(id);
  });

  test('reads the draft invoice', () => {
    const {invoicesReducer} = store.getState();
    const storedInvoice = invoicesReducer?.find(
      (item: InvoiceDraft) => item.id === id,
    );
    expect(storedInvoice?.id).toEqual(id);
  });

  test('edits the draft invoice', () => {
    const dataToDispatch = reduxInvoiceEdit({id, clientName: 'KioskBuddy'});
    store.dispatch(dataToDispatch);

    const {invoicesReducer} = store.getState();
    const storedInvoice = invoicesReducer?.find(
      (item: InvoiceDraft) => item.id === id,
    );
    expect(dataToDispatch.type).toEqual(InvoiceActionTypes.INVOICE_EDIT);
    expect(dataToDispatch.data.id).toEqual(id);
    expect(dataToDispatch.data.clientName).toEqual(storedInvoice?.clientName);
    expect(dataToDispatch.data?.clientName).not.toEqual(
      draftInvoice.clientName,
    );
    expect(storedInvoice?.id).toEqual(id);
    expect(storedInvoice?.description).toEqual(draftInvoice.description);
  });

  test('removes the draft invoice', () => {
    const dataToDispatch = reduxInvoiceDelete(draftInvoice);
    store.dispatch(dataToDispatch);

    const {invoicesReducer} = store.getState();
    const storedInvoice = invoicesReducer?.find(
      (item: InvoiceDraft) => item.id === id,
    );
    expect(dataToDispatch.type).toEqual(InvoiceActionTypes.INVOICE_DELETE);
    expect(dataToDispatch.data.id).toEqual(id);
    expect(storedInvoice).toEqual(undefined);
  });
});

describe('capitalizeFirstChar', () => {
  test('returns the string with the first character capitalized and the rest in lowercase', () => {
    expect(capitalizeFirstChar('hello')).toBe('Hello');
    expect(capitalizeFirstChar('WORLD')).toBe('World');
    expect(capitalizeFirstChar('jAVasCRipt')).toBe('Javascript');
    expect(capitalizeFirstChar('')).toBe('');
  });
});

describe('groupDigits', () => {
  test('should format number with digit grouping and decimal format', () => {
    expect(groupDigits(1234567)).toBe('1,234,567.00');
    expect(groupDigits(-9876543)).toBe('-9,876,543.00');
    expect(groupDigits(1234.56)).toBe('1,234.56');
    expect(groupDigits(-9876.54)).toBe('-9,876.54');
  });

  test('should handle zero and edge cases', () => {
    expect(groupDigits(0)).toBe('0.00');
    expect(groupDigits(987654)).toBe('987,654.00');
    expect(groupDigits(0.123)).toBe('0.12');
    expect(groupDigits(1234.56789)).toBe('1,234.57');
    expect(groupDigits(1234567890)).toBe('1,234,567,890.00');
  });
});

describe('calculatePaymentDue function', () => {
  test('should add 7 days to the given date', () => {
    const date = '2022-12-24';
    const terms = 7;
    const result = calculatePaymentDue(date, terms);
    expect(result).toBe('2022-12-31');
  });

  test('should handle different date formats', () => {
    const date = '12/24/2022';
    const terms = 7;
    const result = calculatePaymentDue(date, terms);
    expect(result).toBe(dateConfig.invalid);
  });

  test('should handle different terms', () => {
    const date = '2022-12-24';
    const terms = 14;
    const result = calculatePaymentDue(date, terms);
    expect(result).toBe('2023-01-07');
  });

  test('should return the same date if terms are 0', () => {
    const date = '2022-12-24';
    const terms = 0;
    const result = calculatePaymentDue(date, terms);
    expect(result).toBe('2022-12-24');
  });

  test('should return an empty string if the date is invalid', () => {
    const date = 'invalid-date';
    const terms = 7;
    const result = calculatePaymentDue(date, terms);
    expect(result).toBe(dateConfig.invalid);
  });
});

describe('isValidDate', () => {
  test('returns true for valid date in the format "YYYY-MM-DD"', () => {
    expect(isValidDate('2022-12-24')).toBe(true);
    expect(isValidDate('2023-01-01')).toBe(true);
    expect(isValidDate('2021-02-28')).toBe(true);
  });

  test('returns false for invalid date formats', () => {
    expect(isValidDate('2022/12/24')).toBe(false); // Invalid separator
    expect(isValidDate('2022-13-24')).toBe(false); // Invalid month (13)
    expect(isValidDate('2022-12-32')).toBe(false); // Invalid day (32)
    expect(isValidDate('22-12-24')).toBe(false); // Invalid year (less than 4 digits)
    expect(isValidDate('2022-12')).toBe(false); // Incomplete date
    expect(isValidDate('2022-12-24T00:00:00')).toBe(false); // DateTime format
  });
});

describe('calculateItemTotal', () => {
  test('calculates the total correctly for valid numeric inputs', () => {
    expect(calculateItemTotal(3, 10)).toBe(30); // 3 * 10 = 30
    expect(calculateItemTotal(5, 2.5)).toBe(12.5); // 5 * 2.5 = 12.5
    expect(calculateItemTotal('2', 15)).toBe(30); // 2 * 15 = 30
    expect(calculateItemTotal('3', '7')).toBe(21); // 3 * 7 = 21
    expect(calculateItemTotal(0, 5)).toBe(0); // 0 * 5 = 0
    expect(calculateItemTotal(10, 0)).toBe(0); // 10 * 0 = 0
  });

  test('returns 0 for invalid numeric inputs', () => {
    expect(calculateItemTotal('abc', 10)).toBe(0); // Invalid quantity
    expect(calculateItemTotal(3, 'xyz')).toBe(0); // Invalid price
    expect(calculateItemTotal('abc', 'xyz')).toBe(0); // Invalid quantity and price
    expect(calculateItemTotal(NaN, 10)).toBe(0); // Invalid quantity (NaN)
    expect(calculateItemTotal(3, NaN)).toBe(0); // Invalid price (NaN)
    expect(calculateItemTotal(NaN, NaN)).toBe(0); // Invalid quantity and price (both NaN)
  });

  test('handles string numbers with leading/trailing spaces', () => {
    expect(calculateItemTotal(' 5', ' 2 ')).toBe(10); // 5 * 2 = 10
    expect(calculateItemTotal(' 3 ', '2.5 ')).toBe(7.5); // 3 * 2.5 = 7.5
    expect(calculateItemTotal('   2   ', ' 15')).toBe(30); // 2 * 15 = 30
    expect(calculateItemTotal('  3', '   7   ')).toBe(21); // 3 * 7 = 21
    expect(calculateItemTotal('  0', '   5')).toBe(0); // 0 * 5 = 0
  });
});

describe('isValidEmail', () => {
  test('should return true for valid email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('john.doe@example.co.uk')).toBe(true);
    expect(isValidEmail('info+test@example.net')).toBe(true);
  });

  test('should return false for invalid email addresses', () => {
    expect(isValidEmail('test@')).toBe(false); // Missing domain
    expect(isValidEmail('@example.com')).toBe(false); // Missing username
    expect(isValidEmail('test@example')).toBe(false); // Missing top-level domain
    expect(isValidEmail('test@example.')).toBe(false); // Invalid top-level domain
    expect(isValidEmail('test@.com')).toBe(false); // Invalid domain
    expect(isValidEmail('test.example.com')).toBe(false); // Missing @ symbol
    expect(isValidEmail('test@example_com')).toBe(false); // Underscore in domain
  });

  test('should return false for non-string inputs', () => {
    //@ts-ignore
    expect(isValidEmail(123)).toBe(false);
    //@ts-ignore
    expect(isValidEmail(true)).toBe(false);
    //@ts-ignore
    expect(isValidEmail(null)).toBe(false);
    //@ts-ignore
    expect(isValidEmail(undefined)).toBe(false);
    //@ts-ignore
    expect(isValidEmail({})).toBe(false);
    //@ts-ignore
    expect(isValidEmail([])).toBe(false);
  });
});

const validFormData = sample[0] as InvoiceDraft;

const missingClientName = {
  ...validFormData,
  clientName: '', // Missing clientName
};

const missingClientEmail = {
  ...validFormData,
  clientEmail: '', // Missing clientEmail
};

const missingSenderStreet = {
  ...validFormData,
  senderAddress: {
    ...validFormData.senderAddress,
    street: '', // Missing street in senderAddress
  },
};

const missingClientStreet = {
  ...validFormData,
  clientAddress: {
    ...validFormData.clientAddress,
    street: '', // Missing street in clientAddress
  },
};

const missingItems = {
  ...validFormData,
  items: [], // Empty items array
};

const invalidClientEmail = {
  ...validFormData,
  clientEmail: 'invalid-email', // Invalid clientEmail
};

describe('findFormErrors', () => {
  test('should return an empty array for valid form data', () => {
    const errors = findFormErrors(validFormData);
    expect(errors).toHaveLength(0);
  });

  test('should return an array of missing fields', () => {
    const errors = findFormErrors(missingClientName);
    expect(errors).toContain('clientName');

    const errors2 = findFormErrors(missingClientEmail);
    expect(errors2).toContain('clientEmail');

    // as any use to ignore type checking
    const errors3 = findFormErrors(missingSenderStreet as any);
    expect(errors3).toContain('senderAddress-street');

    // as any use to ignore type checking
    const errors4 = findFormErrors(missingClientStreet as any);
    expect(errors4).toContain('clientAddress-street');

    const errors5 = findFormErrors(missingItems);
    expect(errors5).toContain('items');
  });

  test('should return an array with invalid clientEmail', () => {
    const errors = findFormErrors(invalidClientEmail);
    expect(errors).toContain('clientEmail');
  });
});
