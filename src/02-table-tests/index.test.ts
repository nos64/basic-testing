import { simpleCalculator, Action } from './index';

const testCases = [
  {
    a: 1,
    b: 2,
    action: Action.Add,
    expected: 3,
    description: 'should add two numbers',
  },
  {
    a: 3,
    b: 1,
    action: Action.Subtract,
    expected: 2,
    description: 'should subtract two numbers',
  },
  {
    a: 2,
    b: 2,
    action: Action.Multiply,
    expected: 4,
    description: 'should multiply two numbers',
  },
  {
    a: 9,
    b: 3,
    action: Action.Divide,
    expected: 3,
    description: 'should divide two numbers',
  },
  {
    a: 2,
    b: 2,
    action: Action.Exponentiate,
    expected: 4,
    description: 'should exponentiate two numbers',
  },
  {
    a: 5,
    b: 3,
    action: '?',
    expected: null,
    description: 'should return null for invalid action',
  },
  {
    a: '1',
    b: 1,
    action: Action.Add,
    expected: null,
    description: 'should return null for invalid first argument',
  },
  {
    a: 1,
    b: '1',
    action: Action.Subtract,
    expected: null,
    description: 'should return null for invalid second argument',
  },
  {
    a: '1',
    b: '1',
    action: Action.Multiply,
    expected: null,
    description: 'should return null for invalid both argument',
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$description', ({ a, b, action, expected }) => {
    const input = { a, b, action };
    const result = simpleCalculator(input);
    expect(result).toBe(expected);
  });
});
