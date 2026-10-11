
import { formatCurrency } from './util.js';

// Display a status message to the user
export function renderStatus(message, type = 'info') {
    const statusBanner = document.getElementById('app-status');

    if (!statusBanner) return;

    statusBanner.textContent = message;
    statusBanner.className = `status-banner ${type}`;
}

// Display the total expenses in the selected home currency

export function renderExpenses(
    expenses,
    homeCurrency = 'KES',
    exchangeRates = {}
) {
    const expenseList = document.getElementById('expense-list');

    if (!expenseList) return;

    expenseList.replaceChildren();

    if (expenses.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');

        cell.colSpan = 5;
        cell.textContent = 'No expenses recorded yet.';

        row.appendChild(cell);
        expenseList.appendChild(row);
        return;
    }

    expenses.forEach((expense) => {
        const row = document.createElement('tr');

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = expense.description;

        const categoryCell = document.createElement('td');
        categoryCell.textContent = expense.category;

        const originalCell = document.createElement('td');
        originalCell.textContent = formatCurrency(
            expense.amount,
            expense.currency
        );

        const convertedCell = document.createElement('td');
        const amount = Number(expense.amount);
        const homeRate = exchangeRates[homeCurrency];
        const expenseRate = exchangeRates[expense.currency];

        if (
            Number.isFinite(amount) &&
            amount >= 0 &&
            Number.isFinite(homeRate) &&
            Number.isFinite(expenseRate) &&
            homeRate > 0 &&
            expenseRate > 0
        ) {
            const convertedValue = (amount / expenseRate) * homeRate;

            convertedCell.textContent = formatCurrency(
                convertedValue,
                homeCurrency
            );
        } else {
            convertedCell.textContent = 'Unavailable';
        }

        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');

        deleteButton.type = 'button';
        deleteButton.className = 'delete-expense';
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.id = expense.id;

        actionCell.appendChild(deleteButton);

        row.append(
            descriptionCell,
            categoryCell,
            originalCell,
            convertedCell,
            actionCell
        );

        expenseList.appendChild(row);
    });
}


// Populate the category filter with unique expense categories
export function renderCategoryOptions(expenses) {
    const categoryFilter = document.getElementById('category-filter');

    if (!categoryFilter) return;

    const selectedCategory = categoryFilter.value;
    const categories = [
        ...new Set(expenses.map((expense) => expense.category))
    ].filter(Boolean).sort();

    categoryFilter.replaceChildren();

    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All categories';
    categoryFilter.appendChild(allOption);

    categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    categoryFilter.value = categories.includes(selectedCategory)
        ? selectedCategory
        : 'all';
}

// Display the selected home currency in the currency selector
export function renderHomeCurrency(currency) {
    const currencySelect = document.getElementById('home-currency');

    if (!currencySelect) return;

    currencySelect.value = currency;
}

// Show or hide the loading indicator
export function renderLoading(isLoading) {
    const loadingIndicator = document.getElementById('loading-indicator');

    if (!loadingIndicator) return;

    loadingIndicator.hidden = !isLoading;
}
