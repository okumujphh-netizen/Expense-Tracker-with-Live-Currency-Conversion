
// Helper functions for browser storage, status messages, and currency formatting

// Supported currencies in this application
const SUPPORTED_CURRENCIES = ['KES', 'USD', 'EUR', 'GBP'];

// Unique browser storage identifiers for this project
const STORAGE_KEYS = {
    EXPENSES: 'eo_tracker_records',
    HOME_CURRENCY: 'eo_tracker_currency'
};

// Format a numeric amount as currency
export function formatCurrency(amount, currencyCode = 'KES') {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount)) {
        return 'Unavailable';
    }

    if (!SUPPORTED_CURRENCIES.includes(currencyCode)) {
        currencyCode = 'KES';
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numericAmount);
}

// Retrieve saved expenses from local storage
export function getStoredExpenses() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);

        if (!data) {
            return [];
        }

        const expenses = JSON.parse(data);

        if (!Array.isArray(expenses)) {
            console.warn(
                'Saved expenses data is invalid. Starting with an empty list.'
            );
            return [];
        }

        return expenses;
    } catch (error) {
        console.error('Could not retrieve saved expenses:', error);
        return [];
    }
}

// Save the current expenses array to local storage
export function saveExpenses(expenses) {
    if (!Array.isArray(expenses)) {
        console.error('Expenses must be provided as an array.');
        return false;
    }

    try {
        localStorage.setItem(
            STORAGE_KEYS.EXPENSES,
            JSON.stringify(expenses)
        );

        return true;
    } catch (error) {
        console.error('Could not save expenses:', error);
        return false;
    }
}

// Retrieve the saved home currency, defaulting to KES
export function getStoredHomeCurrency() {
    try {
        const currency = localStorage.getItem(
            STORAGE_KEYS.HOME_CURRENCY
        );

        return SUPPORTED_CURRENCIES.includes(currency)
            ? currency
            : 'KES';
    } catch (error) {
        console.error('Could not retrieve home currency:', error);
        return 'KES';
    }
}

// Save the selected home currency to local storage
export function saveHomeCurrency(currency) {
    if (!SUPPORTED_CURRENCIES.includes(currency)) {
        console.error('Unsupported home currency:', currency);
        return false;
    }

    try {
        localStorage.setItem(
            STORAGE_KEYS.HOME_CURRENCY,
            currency
        );

        return true;
    } catch (error) {
        console.error('Could not save home currency:', error);
        return false;
    }
}

// Display a status message in the application status banner
export function setAppStatus(message, type = 'info') {
    const statusBanner = document.getElementById('app-status');

    if (!statusBanner) {
        return;
    }

    const allowedTypes = ['info', 'success', 'error', 'warning'];
    const statusType = allowedTypes.includes(type) ? type : 'info';

    statusBanner.textContent = String(message);
    statusBanner.className = `status-banner ${statusType}`;
}
