// state.js - Central application state management

import { 
  getStoredExpenses, 
  saveExpenses, 
  getStoredHomeCurrency, 
  saveHomeCurrency 
} from './util.js';

// Central state object holding app data
const state = {
  expenses: getStoredExpenses(),
  homeCurrency: getStoredHomeCurrency(),
  selectedCategory: 'all',
  exchangeRates: {}
};

// --- Home Currency Getters/Setters ---

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

// --- Category Filter Helpers ---

export function getSelectedCategory() {
  return state.selectedCategory;
}

export function setSelectedCategory(category) {
  state.selectedCategory = category;
}

// --- Expense Actions ---

export function getExpenses() {
  return state.expenses;
}

// Returns expenses filtered by selected category (matches #category-filter in index.html)
export function getFilteredExpenses() {
  if (state.selectedCategory === 'all') {
    return state.expenses;
  }
  return state.expenses.filter(item => item.category === state.selectedCategory);
}

export function addExpense(expenseData) {
  const newExpense = {
    id: Date.now().toString(),
    ...expenseData
  };
  state.expenses.push(newExpense);
  saveExpenses(state.expenses);
  return newExpense;
}

export function deleteExpense(id) {
  state.expenses = state.expenses.filter(item => item.id !== id);
  saveExpenses(state.expenses);
}

// Converts an expense amount into the current home currency using loaded rates

export function convertExpenseAmount(amount, expenseCurrency) {
    const home = state.homeCurrency;
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount < 0) {
        return null;
    }

    // No conversion is needed when both currencies match
    if (expenseCurrency === home) {
        return numericAmount;
    }

    const rates = state.exchangeRates;
    const expenseRate = rates[expenseCurrency];
    const homeRate = rates[home];

    // Do not pretend conversion succeeded if rates are unavailable
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

  // Convert amount to base currency, then to target home currency
  const amountInBase = amount / rates[expenseCurrency];
  return amountInBase * rates[home];


// --- Dashboard Summary Calculation ---

export function getSummaryStats() {
    const filtered = getFilteredExpenses();

    const convertedAmounts = state.expenses.map((item) =>
        convertExpenseAmount(Number(item.amount), item.currency)
    );

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

  // Calculate total converted sum across all recorded expenses
  const totalAmount = state.expenses.reduce((sum, item) => {
    return sum + convertExpenseAmount(Number(item.amount), item.currency);
  }, 0);

  // Count unique categories used across all expenses
  const uniqueCategories = new Set(state.expenses.map(item => item.category)).size;

  return {
    totalAmount: totalAmount,
    totalCount: state.expenses.length,
    visibleCount: filtered.length,
    categoryCount: uniqueCategories
  };
