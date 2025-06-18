// Simple JavaScript test without any Expo dependencies
describe('Basic Math Test', () => {
  it('should add two numbers correctly', () => {
    expect(2 + 2).toBe(4);
  });

  it('should multiply two numbers correctly', () => {
    expect(3 * 4).toBe(12);
  });

  it('should handle string operations', () => {
    expect('Hello ' + 'World').toBe('Hello World');
  });
});

describe('Array Test', () => {
  it('should filter array correctly', () => {
    const numbers = [1, 2, 3, 4, 5];
    const evenNumbers = numbers.filter(num => num % 2 === 0);
    expect(evenNumbers).toEqual([2, 4]);
  });
}); 