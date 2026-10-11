
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
    test('formats numeric amounts using KES by default', () => {
      const formatted = formatCurrency(1500);

      expect(formatted).toContain('1,500.00');
      expect(formatted).toContain('KES');
    });

    test('formats numeric amounts using a custom currency code', () => {
      const formatted = formatCurrency(250, 'USD');

      expect(formatted).toContain('250.00');
      expect(formatted).toMatch(/USD|\$/);
    });

    test('formats zero correctly', () => {
      const formatted = formatCurrency(0);

      expect(formatted).toContain('0.00');
    });

    test('returns Unavailable for non-numeric amounts', () => {
      expect(formatCurrency('invalid-amount')).toBe('Unavailable');
    });

    test('returns Unavailable for NaN', () => {
      expect(formatCurrency(NaN)).toBe('Unavailable');
    });

    test('returns Unavailable for infinite amounts', () => {
      expect(formatCurrency(Infinity)).toBe('Unavailable');
    });

    test('falls back to KES for unsupported currency codes', () => {
      const formatted = formatCurrency(100, 'INVALID');

      expect(formatted).toContain('100.00');
      expect(formatted).toContain('KES');
    });
  });

  describe('Expense Storage Helpers', () => {
    test('returns an empty array when storage is empty', () => {
      expect(getStoredExpenses()).toEqual([]);
    });

    test('saves and retrieves expenses correctly', () => {
      const mockExpenses = [
        {
          id: '1',
          description: 'Coffee',
          amount: 300,
          currency: 'KES',
          category: 'Food'
        },
        {
          id: '2',
          description: 'Transport',
          amount: 500,
          currency: 'KES',
          category: 'Transport'
        }
      ];

      saveExpenses(mockExpenses);

      expect(getStoredExpenses()).toEqual(mockExpenses);
    });

    test('returns an empty array when stored JSON is invalid', () => {
      localStorage.setItem('eo_tracker_records', '{invalid-json');

      expect(getStoredExpenses()).toEqual([]);
    });

    test('returns an empty array when stored data is not an array', () => {
      localStorage.setItem(
        'eo_tracker_records',
        JSON.stringify({ description: 'Coffee' })
      );

      expect(getStoredExpenses()).toEqual([]);
    });

    test('rejects non-array expense data when saving', () => {
      expect(saveExpenses({ description: 'Coffee' })).toBe(false);
    });
  });

  describe('Home Currency Storage Helpers', () => {
    test('defaults to KES when no currency is stored', () => {
      expect(getStoredHomeCurrency()).toBe('KES');
    });

    test('saves and retrieves a supported home currency', () => {
      saveHomeCurrency('EUR');

      expect(getStoredHomeCurrency()).toBe('EUR');
    });

    test('falls back to KES for an unsupported stored currency', () => {
      localStorage.setItem('eo_tracker_currency', 'INVALID');

      expect(getStoredHomeCurrency()).toBe('KES');
    });

    test('rejects unsupported currencies when saving', () => {
      expect(saveHomeCurrency('INVALID')).toBe(false);
      expect(getStoredHomeCurrency()).toBe('KES');
    });
  });

  describe('setAppStatus()', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="app-status"></div>';
    });

    test('updates the status message and CSS class', () => {
      setAppStatus('Data saved successfully!', 'success');

      const banner = document.getElementById('app-status');

      expect(banner.textContent).toBe('Data saved successfully!');
      expect(banner.className).toBe('status-banner success');
    });

    test('defaults to the info status type', () => {
      setAppStatus('Loading records...');

      const banner = document.getElementById('app-status');

      expect(banner.textContent).toBe('Loading records...');
      expect(banner.className).toBe('status-banner info');
    });

    test('uses info for an unsupported status type', () => {
      setAppStatus('Processing...', 'unknown');

      const banner = document.getElementById('app-status');

      expect(banner.className).toBe('status-banner info');
    });

    test('does not throw when the status banner is missing', () => {
      document.body.innerHTML = '';

      expect(() => {
        setAppStatus('An error occurred', 'error');
      }).not.toThrow();
    });
  });
});
