
import { jest } from '@jest/globals';
import {
    formatCurrency,
    getStoredExpenses,
    saveExpenses,
    getStoredHomeCurrency,
    saveHomeCurrency,
    setAppStatus
} from '../src/util.js';

describe('formatCurrency', () => {
    test('formats Kenyan shillings correctly', () => {
        expect(formatCurrency(1500, 'KES')).toContain('1,500.00');
    });

    test('formats US dollars correctly', () => {
        expect(formatCurrency(25, 'USD')).toContain('25.00');
    });

    test('returns Unavailable for invalid amounts', () => {
        expect(formatCurrency(NaN, 'KES')).toBe('Unavailable');
    });
});

describe('expense storage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('saves and retrieves expenses', () => {
        const expenses = [
            {
                id: '1',
                description: 'Lunch',
                amount: 250,
                currency: 'KES',
                category: 'Food'
            }
        ];

        expect(saveExpenses(expenses)).toBe(true);
        expect(getStoredExpenses()).toEqual(expenses);
    });

    test('returns an empty array when no expenses are saved', () => {
        expect(getStoredExpenses()).toEqual([]);
    });

    test('rejects invalid expense data', () => {
        expect(saveExpenses('not an array')).toBe(false);
    });
});

describe('home currency storage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('saves a supported home currency', () => {
        expect(saveHomeCurrency('USD')).toBe(true);
        expect(getStoredHomeCurrency()).toBe('USD');
    });

    test('defaults to KES when no currency is saved', () => {
        expect(getStoredHomeCurrency()).toBe('KES');
    });

    test('rejects unsupported currencies', () => {
        expect(saveHomeCurrency('XYZ')).toBe(false);
    });
});

describe('setAppStatus', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="app-status"></div>';
    });

    test('updates the status message and class', () => {
        setAppStatus('Expense saved', 'success');

        const banner = document.getElementById('app-status');
        expect(banner.textContent).toBe('Expense saved');
        expect(banner.className).toBe('status-banner success');
    });

    test('does not throw when the status element is missing', () => {
        document.body.innerHTML = '';

        expect(() => setAppStatus('Hello')).not.toThrow();
    });
});
