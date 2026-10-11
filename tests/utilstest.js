import {
  formatCurrency,
  getStoredExpenses,
  saveExpenses,
  getStoredHomeCurrency,
  saveHomeCurrency,
  setAppStatus
} from './util.js';

describe('Utility Functions', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  describe('formatCurrency()', () => {
    test('formats numeric amounts with default currency (KES)', () => {
      const formatted = formatCurrency(1500);
      expect(formatted).toContain('1,500.00');
      expect(formatted).toContain('KES');
    });

    test('formats numeric amounts with a custom currency code (USD)', () => {
      const formatted = formatCurrency(250, 'USD');
      expect(formatted).toContain('250.00');
      expect(formatted).toContain('USD');
    });

    test('defaults to 0.00 for non-numeric or invalid amounts', () => {
      const formatted = formatCurrency('invalid-amount');
      expect(formatted).toContain('0.00');
    });
  });
  describe('Expense Storage Helpers', () => {
    test('getStoredExpenses returns an empty array when storage is empty', () => {
      const expenses = getStoredExpenses();
      expect(expenses).toEqual([]);
    });

    test('saveExpenses correctly stores and getStoredExpenses retrieves expenses', () => {
      const mockExpenses = [
        { id: '1', title: 'Coffee', amount: 300 },
        { id: '2', title: 'Transport', amount: 500 }
      ];

      saveExpenses(mockExpenses);
      const retrieved = getStoredExpenses();
      expect(retrieved).toEqual(mockExpenses);
    });
  });

  describe('Home Currency Storage Helpers', () => {
    test('getStoredHomeCurrency defaults to KES when nothing is stored', () => {
      const currency = getStoredHomeCurrency();
      expect(currency).toBe('KES');
    });

    test('saveHomeCurrency and getStoredHomeCurrency work together', () => {
      saveHomeCurrency('EUR');
      const currency = getStoredHomeCurrency();
      expect(currency).toBe('EUR');
});