import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const jestConsoleSpy = jest.spyOn(console, 'log');

    const mockedFunctions = [mockOne, mockTwo, mockThree];
    const messages = ['foo', 'bar', 'baz'];

    mockedFunctions.forEach((fn) => {
      jest.mocked(fn).mockImplementation(jest.fn());
    });

    mockedFunctions.forEach((fn) => fn());

    expect(jestConsoleSpy).not.toHaveBeenCalled();

    mockedFunctions.forEach((fn) => {
      expect(fn).toHaveBeenCalled();
    });

    messages.forEach((message) => {
      expect(jestConsoleSpy).not.toHaveBeenCalledWith(message);
    });

    jestConsoleSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    unmockedFunction();

    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');
    consoleSpy.mockRestore();
  });
});
