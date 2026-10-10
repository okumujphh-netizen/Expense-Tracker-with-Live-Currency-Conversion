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