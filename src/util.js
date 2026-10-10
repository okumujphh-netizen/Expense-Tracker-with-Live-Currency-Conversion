// Helper tools for handling browser storage, status notifications, and currency formatting.sz

// Transforms a raw number into a formatted currency text string
export function formatCurrency(amount, currencyCode = 'KES') {
    const numericAmount = Number(amount) || 0;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numericAmount);
}
 

// Unique browser storage identifiers for this project
const STORAGE_KEYS = {
    EXPENSES: 'eo_tracker_records',
    HOME_CURRENCY: 'eo_tracker_currency'
};

// Pulls saved expense items from local storage, defaults to empty list
export function getStoredExpenses() {
    const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return data ? JSON.parse(data) : [];
}

// Stores the current expenses array into local storage
export function saveExpenses(expenses) {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
}

// Fetches the user's chosen home currency, falling back to KES
export function getStoredHomeCurrency() {
    return localStorage.getItem(STORAGE_KEYS.HOME_CURRENCY) || 'KES';
}

// Updates and saves the selected home currency preference
export function saveHomeCurrency(currency) {
    localStorage.setItem(STORAGE_KEYS.HOME_CURRENCY, currency);
}

// Modifies the app status banner text and styling dynamically
export function setAppStatus(message, type = 'info') {
    const statusBanner = document.getElementById('app-status');
    if (!statusBanner) return;

    statusBanner.textContent = message;
    statusBanner.className = `status-banner ${type}`;
}
