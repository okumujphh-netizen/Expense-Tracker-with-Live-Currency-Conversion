// Mock localStorage for Node environment
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    clear: () => { store = {}; },
    removeItem: (key) => { delete store[key]; }
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true
});
import {
  formatCurrency,
  getStoredExpenses,
  saveExpenses,
  getStoredHomeCurrency,
  saveHomeCurrency,
  setAppStatus
} from '../src/util.js';

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
  expect(formatted).toContain('$');
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
  });
  describe('setAppStatus()', () => {
    test('updates status banner text content and className correctly', () => {
      document.body.innerHTML = '<div id="app-status"></div>';

      setAppStatus('Data saved successfully!', 'success');

      const banner = document.getElementById('app-status');
      expect(banner.textContent).toBe('Data saved successfully!');
      expect(banner.className).toBe('status-banner success');
    });

    test('defaults to info type if none is provided', () => {
      document.body.innerHTML = '<div id="app-status"></div>';

      setAppStatus('Loading records...');

      const banner = document.getElementById('app-status');
      expect(banner.textContent).toBe('Loading records...');
      expect(banner.className).toBe('status-banner info');
    });

    test('does not throw an error if the status banner element is missing from the DOM', () => {
      document.body.innerHTML = '';

      expect(() => {
        setAppStatus('Error occurred', 'error');
      }).not.toThrow();
    });
  });
});
