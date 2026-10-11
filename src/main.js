

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

// HTML elements
const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const currencyInput = document.getElementById('currency');
const categoryInput = document.getElementById('category');
const homeCurrencyInput = document.getElementById('home-currency');
const categoryFilter = document.getElementById('category-filter');
const expenseList = document.getElementById('expense-list');

const totalAmountElement = document.getElementById('total-amount');
const expenseCount = document.getElementById('expense-count');
const categoryCount = document.getElementById('category-count');
const visibleCount = document.getElementById('visible-count');

// Check that all required HTML elements exist
function hasRequiredElements() {
    const elements = [
        expenseForm,
        descriptionInput,
        amountInput,
        currencyInput,
        categoryInput,
        homeCurrencyInput,
        categoryFilter,
        expenseList,
        totalAmountElement,
        expenseCount,
        categoryCount,
        visibleCount
    ];

    const missingElement = elements.some((element) => !element);

    if (missingElement) {
        console.error(
            'Required HTML elements are missing. Check the IDs in index.html.'
        );
        return false;
    }

    return true;
}

// Render the current application state
function renderApp() {
    const expenses = getExpenses();
    const filteredExpenses = getFilteredExpenses();
    const homeCurrency = getHomeCurrency();
    const stats = getSummaryStats();

    renderTotal(stats.totalAmount, homeCurrency);

    renderExpenses(
        filteredExpenses,
        homeCurrency,
        getExchangeRates()
    );

    renderCategoryOptions(expenses);
    renderHomeCurrency(homeCurrency);

    expenseCount.textContent = stats.totalCount;
    categoryCount.textContent = stats.categoryCount;
    visibleCount.textContent = stats.visibleCount;
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
    const amountText = amountInput.value.trim();
    const amount = Number(amountText);
    const currency = currencyInput.value;
    const category = categoryInput.value;

    if (!description || !currency || !category) {
        renderStatus(
            'Please complete all expense fields.',
            'error'
        );
        return;
    }

    if (
        amountText === '' ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        renderStatus(
            'Enter an amount greater than zero.',
            'error'
        );
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
    const target = event.target;

    if (!(target instanceof Element)) {
        return;
    }

    const button = target.closest('.delete-expense');

    if (!button) {
        return;
    }

    deleteExpense(button.dataset.id);
    renderApp();

    renderStatus('Expense deleted successfully.', 'success');
}

// Filter expenses by category
function handleCategoryChange() {
    setSelectedCategory(categoryFilter.value);
    renderApp();
}

// Change home currency and fetch updated rates
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

// Register event listeners
function registerEventListeners() {
    expenseForm.addEventListener('submit', handleAddExpense);

    expenseList.addEventListener(
        'click',
        handleExpenseListClick
    );

    categoryFilter.addEventListener(
        'change',
        handleCategoryChange
    );

    homeCurrencyInput.addEventListener(
        'change',
        handleHomeCurrencyChange
    );
}

// Initialize the application
function initializeApp() {
    if (!hasRequiredElements()) {
        return;
    }

    setSelectedCategory(categoryFilter.value || 'all');

    registerEventListeners();

    renderApp();
    loadExchangeRates();
}

initializeApp();
