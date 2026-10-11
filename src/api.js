
const API_BASE_URL = 'https://open.er-api.com/v6/latest';

const SUPPORTED_CURRENCIES = ['KES', 'USD', 'EUR', 'GBP'];

// Fetch live exchange rates for the selected base currency
export async function fetchExchangeRates(baseCurrency = 'KES') {
    if (
        typeof baseCurrency !== 'string' ||
        !SUPPORTED_CURRENCIES.includes(baseCurrency)
    ) {
        throw new Error(
            `Unsupported base currency: ${baseCurrency}`
        );
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/${encodeURIComponent(baseCurrency)}`
        );

        // Check whether the HTTP request was successful
        if (!response.ok) {
            throw new Error(
                `Exchange rate request failed: HTTP ${response.status}`
            );
        }

        const data = await response.json();

        // Check the API's response status
        if (data?.result !== 'success') {
            throw new Error(
                data?.['error-type'] ||
                'Unable to retrieve exchange rates.'
            );
        }

        // Validate the exchange-rate data
        if (
            !data.rates ||
            typeof data.rates !== 'object' ||
            Array.isArray(data.rates)
        ) {
            throw new Error(
                'The API returned invalid exchange rate data.'
            );
        }

        // Validate the rates required by this application
        for (const currency of SUPPORTED_CURRENCIES) {
            if (
                currency !== baseCurrency &&
                (
                    typeof data.rates[currency] !== 'number' ||
                    !Number.isFinite(data.rates[currency]) ||
                    data.rates[currency] <= 0
                )
            ) {
                throw new Error(
                    `Missing or invalid exchange rate for ${currency}.`
                );
            }
        }

        // Include the base currency at a rate of 1
        return {
            ...data.rates,
            [baseCurrency]: 1
        };
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);

        throw new Error(
            `Could not load exchange rates. ${error.message}`,
            { cause: error }
        );
    }
}
