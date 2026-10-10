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
  
  // No conversion needed if currencies match
  if (expenseCurrency === home) {
    return amount;
  }

  const rates = state.exchangeRates;
  if (!rates || !rates[expenseCurrency] || !rates[home]) {
    return amount; // Fallback if exchange rates aren't loaded yet
  }

  // Convert amount to base currency, then to target home currency
  const amountInBase = amount / rates[expenseCurrency];
  return amountInBase * rates[home];
}

// --- Dashboard Summary Calculation ---

export function getSummaryStats() {
  const filtered = getFilteredExpenses();
  
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
}