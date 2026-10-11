# Expense Tracker with Live Currency Conversion

## Description

Managing personal expenses can become difficult when transactions involve different currencies, especially when exchange rates change over time. This Expense Tracker with Live Currency Conversion is a web application designed to help users record, organize, and monitor their expenses while viewing their spending in a preferred currency. It uses live exchange-rate data to convert expenses between supported currencies, helping users better understand their spending and manage their finances.

## Live Demo

**[View the live application on GitHub Pages](https://okumujphh-netizen.github.io/expense-tracker-with-live-currency-conversion/)**



## Features

- **Add expenses:** Record expenses with a description, amount, currency, and category.
- **Delete expenses:** Remove expense records that are no longer needed.
- **Expense categories:** Organize expenses into categories such as Food, Transport, and Shopping.
- **Category filtering:** Filter the expense list by category.
- **Live currency conversion:** Retrieve exchange rates from an external REST API and convert expenses into the selected home currency.
- **Multiple currencies:** Support Kenyan Shillings (KES), US Dollars (USD), Euros (EUR), and British Pounds (GBP).
- **Expense summaries:** View total spending, the number of expenses, and the number of categories used.
- **Persistent storage:** Save expenses and the preferred home currency in browser local storage.
- **Status and error messages:** Display feedback for application operations and exchange-rate errors.
- **Automated testing:** Use Jest to test JavaScript functionality.
- **Code quality checks:** Use ESLint to identify potential JavaScript issues.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structures the application interface. |
| CSS3 | Styles the application and supports responsive layouts. |
| JavaScript (ES Modules) | Handles application logic, state, API requests, and DOM updates. |
| REST API — ExchangeRate-API | Provides exchange-rate data for currency conversion. |
| Browser Local Storage | Persists expenses and the selected home currency. |
| Jest | Runs automated JavaScript tests. |
| ESLint | Checks JavaScript code for potential errors and style issues. |
| Git and GitHub | Version control and source code hosting. |
| GitHub Pages | Hosts the live application. |

### API

The application uses the [Open Exchange Rate API endpoint](https://open.er-api.com/v6/latest) provided by ExchangeRate-API's open endpoint service to retrieve exchange rates.

The application requests rates using a base currency and uses the returned rates to convert expense amounts into the user's selected home currency.

### JavaScript Modules

The application separates its responsibilities into modules:

- `src/main.js` — coordinates application behavior and event handling.
- `src/api.js` — retrieves and validates exchange-rate data.
- `src/state.js` — manages expenses, currency settings, conversion calculations, and summary data.
- `src/ui.js` — updates the interface and renders expense records, totals, filters, and status messages.
- `src/util.js` — provides reusable utility functions, currency formatting, local storage operations, and status handling.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- [Git](https://git-scm.com/)
- A modern web browser

### Run Locally

1. Clone the repository:

      git clone https://github.com/okumujphh-netizen/expense-tracker-with-live-currency-conversion.git
   

2. Navigate to the project directory:

   
   cd expense-tracker-with-live-currency-conversion
   

3. Install the project dependencies:

   
   npm install
   

4. Start a local development server. For example, if Python 3 is installed:

   
   python3 -m http.server 8000
   

5. Open the following address in your browser:

   
   http://localhost:8000
   

The application requires an internet connection to retrieve live exchange rates. Expense records and the preferred home currency are stored in the browser's local storage.

## Running Tests

Run the automated test suite with:

npm test


Jest runs the project's configured tests to check the behavior of the JavaScript functions and application utilities.

## Running ESLint

Run the code quality checks with:

```bash
npm run lint
```

ESLint checks the JavaScript code for potential problems according to the project's configuration.

## What I'd Improve With More Time

With more time, I would improve the application by adding:

- **Spending visualizations:** Charts showing expenses by category and over time.
- **Monthly budgets:** Allow users to set budgets and track their progress.
- **More currencies:** Expand currency support beyond the four currently supported currencies.
- **Export functionality:** Allow users to download their expense records as CSV reports.
- **Advanced filtering:** Filter expenses by date, amount, and category.
- **Improved accessibility:** Enhance keyboard navigation, screen-reader support, and interface accessibility.
- **More comprehensive tests:** Expand unit and integration tests to cover API failures, invalid inputs, currency conversion, and expense management.
- **Improved data management:** Explore secure account-based storage and synchronization across devices.

## Author

**Eugene Osano Ogero**
**John  Paul  Okumu**

GitHub: [okumujphh-netizen](https://github.com/okumujphh-netizen)

---

This project was developed as part of my software engineering learning journey, applying JavaScript modules, API integration, browser storage, automated testing, and code quality practices to a practical financial application.
