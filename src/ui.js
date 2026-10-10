
import { formatCurrency } from './util.js';

// Display a status message to the user
export function renderStatus(message, type = 'info') {
    const statusBanner = document.getElementById('app-status');

    if (!statusBanner) return;

    statusBanner.textContent = message;
    statusBanner.className = `status-banner ${type}`;
}

// Display the total expenses in the selected home currency
export function renderTotal(total, homeCurrency = 'KES') {
    const totalElement = document.getElementById('total-amount');

    if (!totalElement) return;

    totalElement.textContent = formatCurrency(total, homeCurrency);
}

// Display all expenses in the expense list
export function renderExpenses(
    expenses,
    homeCurrency = 'KES',
    exchangeRates = {}
) {
    const expenseList = document.getElementById('expense-list');

    if (!expenseList) return;

    // Clear the previous list before rendering again
    expenseList.replaceChildren();

    if (expenses.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'No expenses yet. Add your first expense!';

        expenseList.appendChild(emptyMessage);
        return;
    }

    expenses.forEach((expense) => {
        const expenseItem = document.createElement('article');
        expenseItem.className = 'expense-item';

        const details = document.createElement('div');
        details.className = 'expense-details';

        const description = document.createElement('h3');
        description.textContent = expense.description;

        const category = document.createElement('p');
        category.textContent = expense.category;

        const originalAmount = document.createElement('p');
        originalAmount.textContent = `Original: ${formatCurrency(
            expense.amount,
            expense.currency
        )}`;

        const convertedAmount = document.createElement('p');
        const amount = Number(expense.amount);
        const homeRate = exchangeRates[homeCurrency];
        const expenseRate = exchangeRates[expense.currency];

        let convertedValue = null;

        if (
            Number.isFinite(amount) &&
            amount >= 0 &&
            Number.isFinite(homeRate) &&
            Number.isFinite(expenseRate) &&
            homeRate > 0 &&
            expenseRate > 0
        ) {
            convertedValue = (amount / expenseRate) * homeRate;
        }

        convertedAmount.textContent =
            convertedValue === null
                ? 'Converted amount unavailable'
                : `In ${homeCurrency}: ${formatCurrency(
                      convertedValue,
                      homeCurrency
                  )}`;

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete-expense';
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.id = expense.id;

        details.append(
            description,
            category,
            originalAmount,
            convertedAmount
        );

        expenseItem.append(details, deleteButton);
        expenseList.appendChild(expenseItem);
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
