import { expect, test } from '@jest/globals';
import { add, isEven, capitalize } from './utils';

test('add() adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
});

test('isEven() checks if a number is even', () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(3)).toBe(false);
});

test('capitalize() capitalizes the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
    expect(capitalize('')).toBe('');
});
