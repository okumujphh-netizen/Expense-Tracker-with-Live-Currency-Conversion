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
});