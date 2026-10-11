
import { fetchExchangeRates } from './api.js';

import {
    getExpenses,
    getFilteredExpenses,
    getHomeCurrency,
    setHomeCurrency,
    setExchangeRates,
    getExchangeRates,
    setSelectedCategory,
    addExpense,
    deleteExpense,
    getSummaryStats
} from './state.js';

import {
    renderStatus,
    renderTotal,
    renderExpenses,
    renderCategoryOptions,
    renderHomeCurrency,
    renderLoading
} from './ui.js';

// Select the HTML elements used by the application
const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('expense-description');
const amountInput = document.getElementById('expense-amount');
const currencyInput = document.getElementById('expense-currency');
const categoryInput = document.getElementById('expense-category');
const homeCurrencyInput = document.getElementById('home-currency');
const categoryFilter = document.getElementById('category-filter');
const expenseList = document.getElementById('expense-list');

// Update the displayed expenses, categories and total
function renderApp() {
    const expenses = getExpenses();
    const filteredExpenses = getFilteredExpenses();
    const homeCurrency = getHomeCurrency();

    renderTotal(getSummaryStats().totalAmount, homeCurrency);
    renderExpenses(filteredExpenses, homeCurrency, getExchangeRates());
    renderCategoryOptions(expenses);
    renderHomeCurrency(homeCurrency);
}

// Fetch live exchange rates for the selected home currency
async function loadExchangeRates() {
    renderLoading(true);
    renderStatus('Loading exchange rates...', 'info');

    try {
        const rates = await fetchExchangeRates(getHomeCurrency());

        setExchangeRates(rates);
        renderApp();

        renderStatus('Exchange rates loaded successfully.', 'success');
    } catch (error) {
        console.error('Exchange-rate error:', error);

        setExchangeRates({});
        renderApp();

        renderStatus(
            'Could not load exchange rates. Check your internet connection and try again.',
            'error'
        );
    } finally {
        renderLoading(false);
    }
}

// Handle submission of the add-expense form
function handleAddExpense(event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const currency = currencyInput.value;
    const category = categoryInput.value;

    if (!description || !currency || !category) {
        renderStatus('Please complete all expense fields.', 'error');
        return;
    }

    if (
        amountInput.value.trim() === '' ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        renderStatus('Enter an amount greater than zero.', 'error');
        return;
    }

    addExpense({
        description,
        amount,
        currency,
        category
    });

    expenseForm.reset();
    renderApp();

    renderStatus('Expense added successfully.', 'success');
}

// Handle clicks on Delete buttons
function handleExpenseListClick(event) {
    const button = event.target.closest('.delete-expense');

    if (!button) return;

    deleteExpense(button.dataset.id);
    renderApp();

    renderStatus('Expense deleted successfully.', 'success');
}

// Filter expenses by category
function handleCategoryChange() {
    setSelectedCategory(categoryFilter.value);
    renderApp();
}

// Change the home currency and fetch updated exchange rates
async function handleHomeCurrencyChange() {
    const currency = homeCurrencyInput.value;

    if (!currency || currency === getHomeCurrency()) {
        return;
    }

    setHomeCurrency(currency);
    setExchangeRates({});

    renderApp();

    await loadExchangeRates();
}

// Connect the HTML elements to their event handlers
function registerEventListeners() {
    expenseForm.addEventListener('submit', handleAddExpense);

    expenseList.addEventListener('click', handleExpenseListClick);

    categoryFilter.addEventListener('change', handleCategoryChange);

    homeCurrencyInput.addEventListener(
        'change',
        handleHomeCurrencyChange
    );
}

// Start the application
function initializeApp() {
    if (
        !expenseForm ||
        !descriptionInput ||
        !amountInput ||
        !currencyInput ||
        !categoryInput ||
        !homeCurrencyInput ||
        !categoryFilter ||
        !expenseList
    ) {
        console.error(
            'Required HTML elements are missing. Check the IDs in index.html.'
        );
        return;
    }

    setSelectedCategory(categoryFilter.value || 'all');

    registerEventListeners();

    renderApp();
    loadExchangeRates();
}

initializeApp();
