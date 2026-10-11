# Expense Tracker with Live Currency Conversion

A web application that helps users record, manage, and track their expenses in different currencies. It fetches live exchange rates and converts expenses into a selected home currency, making it easier to understand total spending in one place.

## Features

- **Add expenses:** Record an expense description, amount, currency, and category.
- **Live currency conversion:** Fetch exchange rates from an external API.
- **Custom home currency:** Choose between Kenyan Shillings (KES), US Dollars (USD), Euros (EUR), and British Pounds (GBP).
- **Expense dashboard:** View total spending, total expenses, and the number of categories.
- **Category filtering:** Filter expenses by category.
- **Delete expenses:** Remove expenses you no longer need.
- **Persistent storage:** Save expenses and your preferred home currency in the browser using Local Storage.
- **Error handling:** Display status messages when exchange rates cannot be loaded.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES Modules)
- Fetch API
- ExchangeRate-API — [open.er-api.com](https://open.er-api.com/)
- Browser Local Storage

## Project Structure


Expense-Tracker-with-Live-Currency-Conversion/
├── index.html
├── style.css
└── src/
    ├── api.js
    ├── main.js
    ├── state.js
    └── util.js


## Getting Started

### Prerequisites

- A modern web browser.
- An internet connection for retrieving live exchange rates.
- Git, if you want to clone the repository.

### Installation

1. Clone the repository:

   
   git clone https://github.com/okumujphh-netizen/Expense-Tracker-with-Live-Currency-Conversion.git
   

2. Navigate to the project directory:

   
   cd Expense-Tracker-with-Live-Currency-Conversion
   

3. Open the project using a local development server. If you use Visual Studio Code, you can use the Live Server extension.

   Alternatively, if Python 3 is installed, run:

   
   python3 -m http.server 8000
   

4. Open the following address in your browser:

   
   http://localhost:8000
   

   Keep the terminal running while using the application.

## How to Use

1. Select your preferred home currency.
2. Enter an expense description.
3. Enter the expense amount and select its currency.
4. Choose an expense category.
5. Submit the form to add the expense.
6. Review the dashboard and converted amounts.
7. Use the category filter to narrow down your expenses.
8. Delete an expense when it is no longer needed.

## Currency Conversion

The application retrieves exchange rates from the selected home currency. Expense amounts are converted using the available rates so that different currencies can be compared in a common currency.

An internet connection is required to retrieve current rates. If the API is unavailable or rates are missing, some converted amounts or the total may be unavailable.

Exchange rates are informational and may differ from rates offered by banks or payment providers.

## Data Storage

Expenses and the selected home currency are stored in the browser's Local Storage. This means data remains available in the same browser on the same device after refreshing the page.

**Note:** Clearing browser storage or using a different browser or device may remove or leave behind access to your saved expenses. The application does not currently use a cloud database.

## Future Improvements

- Edit existing expenses.
- Add expense dates and monthly summaries.
- Display spending charts and reports.
- Export expenses to CSV.
- Add budgets and spending limits.
- Improve offline support and exchange-rate caching.
- Introduce cloud storage and user accounts.

## Author

**John Okumu**

GitHub: [@okumujphh-netizen](https://github.com/okumujphh-netizen)

## License

This project is available for learning and personal development. Add a specific open-source license if you intend to formally permit reuse and redistribution.
