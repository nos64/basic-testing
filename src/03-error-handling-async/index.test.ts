import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const valueNumber = 10;
    const result1 = await resolveValue(valueNumber);
    expect(result1).toBe(valueNumber);

    const valueString = 'test string';
    const result2 = await resolveValue(valueString);
    expect(result2).toBe(valueString);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'Oops! ERROR!!!';
    expect(() => throwError(msg)).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
    expect(() => throwCustomError()).toThrow(
      /^This is my awesome custom error!$/,
    );
    expect(() => throwCustomError()).toThrow(/custom error!/);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
    expect(() => rejectCustomError()).rejects.toThrow(
      /^This is my awesome custom error!$/,
    );
    expect(() => rejectCustomError()).rejects.toThrow(/custom error!/);
  });
});
