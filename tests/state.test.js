import { addExpense } from '../src/state.js';

describe('State Management Module', () => {
  it('should successfully add a new expense and return the created object with an id', () => {
    const expenseData = {
      description: 'Bus fare',
      amount: 100,
      currency: 'KES',
      category: 'Transport'
    };

    const result = addExpense(expenseData);

    // Assertions (accessing the first item in the returned array)
    expect(result[0]).toHaveProperty('id');
    expect(result[0].description).toBe('Bus fare');
    expect(result[0].amount).toBe(100);
  });
});