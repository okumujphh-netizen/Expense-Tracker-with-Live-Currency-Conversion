
import {
    getStoredExpenses,
    saveExpenses,
    getStoredHomeCurrency,
    saveHomeCurrency
} from './util.js';

// Central application state
const state = {
    expenses: getStoredExpenses(),
    homeCurrency: getStoredHomeCurrency(),
    selectedCategory: 'all',
    exchangeRates: {}
};

// Home currency getters and setters
export function getHomeCurrency() {
    return state.homeCurrency;
}

export function setHomeCurrency(currency) {
    state.homeCurrency = currency;
    saveHomeCurrency(currency);
}

export function setExchangeRates(rates) {
    state.exchangeRates = rates || {};
}

export function getExchangeRates() {
    return state.exchangeRates;
}

// Category filter helpers
export function getSelectedCategory() {
    return state.selectedCategory;
}

export function setSelectedCategory(category) {
    state.selectedCategory = category;
}

// Expense actions
export function getExpenses() {
    return state.expenses;
}

export function getFilteredExpenses() {
    if (state.selectedCategory === 'all') {
        return state.expenses;
    }

    return state.expenses.filter(
        (item) => item.category === state.selectedCategory
    );
}

export function addExpense(expenseData) {
    const newExpense = {
        id: Date.now().toString(),
        ...expenseData
    };
    
    state.expenses.push(newExpense);
    
    // Make sure you return the array or state that the test expects!
    return state.expenses; 
}

export function deleteExpense(id) {
    state.expenses = state.expenses.filter(
        (item) => item.id !== id
    );

    saveExpenses(state.expenses);
}

// Convert an expense amount into the selected home currency
export function convertExpenseAmount(amount, expenseCurrency) {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount < 0) {
        return null;
    }

    // No conversion is needed for matching currencies
    if (expenseCurrency === state.homeCurrency) {
        return numericAmount;
    }

    const rates = state.exchangeRates;
    const expenseRate = rates[expenseCurrency];
    const homeRate = rates[state.homeCurrency];

    // Return null when exchange rates are unavailable or invalid
    if (
        !Number.isFinite(expenseRate) ||
        !Number.isFinite(homeRate) ||
        expenseRate <= 0 ||
        homeRate <= 0
    ) {
        return null;
    }

    return (numericAmount / expenseRate) * homeRate;
}

// Dashboard summary statistics
export function getSummaryStats() {
    const filtered = getFilteredExpenses();

    const convertedAmounts = state.expenses.map((item) =>
        convertExpenseAmount(item.amount, item.currency)
    );

    // Do not show an incomplete or misleading total
    const totalAmount = convertedAmounts.every(
        (amount) => amount !== null
    )
        ? convertedAmounts.reduce((sum, amount) => sum + amount, 0)
        : null;

    const uniqueCategories = new Set(
        state.expenses.map((item) => item.category)
    ).size;

    return {
        totalAmount,
        totalCount: state.expenses.length,
        visibleCount: filtered.length,
        categoryCount: uniqueCategories
    };
}
