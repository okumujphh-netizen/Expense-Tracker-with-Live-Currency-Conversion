
const API_BASE_URL = 'https://open.er-api.com/v6/latest';

// Fetches live exchange rates for the selected base currency
export async function fetchExchangeRates(baseCurrency = 'KES') {
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

        // The API can return an error status even when HTTP succeeds
        if (data.result !== 'success') {
            throw new Error(
                data['error-type'] || 'Unable to retrieve exchange rates.'
            );
        }

        // Validate that the response contains exchange rates
        if (!data.rates || typeof data.rates !== 'object') {
            throw new Error('The API returned invalid exchange rate data.');
        }

        // Include the base currency itself at a rate of 1
        return {
            ...data.rates,
            [baseCurrency]: 1
        };
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);

        // Let the calling module display the error to the user
        throw new Error(
            `Could not load exchange rates. ${error.message}`,
            { cause: error }
        );
    }
}
