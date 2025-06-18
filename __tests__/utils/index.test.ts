import {
    addDays,
    capitalizeFirst,
    formatDate,
    formatTime,
    groupBy,
    handleError,
    isMobile,
    isSameDay,
    isValidDate,
    isValidEmail,
    isWeb,
    truncateText,
} from '../../src/shared/utils';

describe('Date Utilities', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15');
    const formatted = formatDate(date);
    expect(formatted).toBe('1/15/2024');
  });

  it('formats time correctly', () => {
    const date = new Date('2024-01-15T14:30:00');
    const formatted = formatTime(date);
    expect(formatted).toBe('02:30 PM');
  });

  it('checks if dates are the same day', () => {
    const date1 = new Date('2024-01-15T10:00:00');
    const date2 = new Date('2024-01-15T20:00:00');
    const date3 = new Date('2024-01-16T10:00:00');

    expect(isSameDay(date1, date2)).toBe(true);
    expect(isSameDay(date1, date3)).toBe(false);
  });

  it('adds days correctly', () => {
    const date = new Date('2024-01-15');
    const newDate = addDays(date, 5);
    expect(newDate.getDate()).toBe(20);
  });
});

describe('String Utilities', () => {
  it('capitalizes first letter', () => {
    expect(capitalizeFirst('hello')).toBe('Hello');
    expect(capitalizeFirst('world')).toBe('World');
  });

  it('truncates text correctly', () => {
    expect(truncateText('Hello World', 5)).toBe('Hello...');
    expect(truncateText('Hi', 5)).toBe('Hi');
  });
});

describe('Validation Utilities', () => {
  it('validates email correctly', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
  });

  it('validates date correctly', () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate('not a date')).toBe(false);
    expect(isValidDate(null)).toBe(false);
  });
});

describe('Array Utilities', () => {
  it('groups array by key', () => {
    const items = [
      { id: 1, category: 'A' },
      { id: 2, category: 'B' },
      { id: 3, category: 'A' },
    ];

    const grouped = groupBy(items, item => item.category);
    expect(grouped.A).toHaveLength(2);
    expect(grouped.B).toHaveLength(1);
  });
});

describe('Platform Utilities', () => {
  it('detects platform correctly', () => {
    // These tests will depend on the environment
    expect(typeof isWeb()).toBe('boolean');
    expect(typeof isMobile()).toBe('boolean');
  });
});

describe('Error Handling', () => {
  it('handles Error objects', () => {
    const error = new Error('Test error');
    expect(handleError(error)).toBe('Test error');
  });

  it('handles string errors', () => {
    expect(handleError('String error')).toBe('String error');
  });

  it('handles unknown errors', () => {
    expect(handleError(123)).toBe('123');
  });
}); 