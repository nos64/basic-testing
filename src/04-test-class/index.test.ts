import { getBankAccount } from '.';

describe('BankAccount', () => {
  let firstInitialBalance: number;
  let secondInitialBalance: number;
  let firstAccount: ReturnType<typeof getBankAccount>;
  let secondAccount: ReturnType<typeof getBankAccount>;

  beforeEach(() => {
    firstInitialBalance = 1000;
    secondInitialBalance = 1000;
    firstAccount = getBankAccount(firstInitialBalance);
    secondAccount = getBankAccount(secondInitialBalance);
  });

  test('should create account with initial balance', () => {
    expect(firstAccount.getBalance()).toBe(firstInitialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => firstAccount.withdraw(firstInitialBalance + 1)).toThrow(
      `Insufficient funds: cannot withdraw more than ${firstInitialBalance}`,
    );

    expect(() => firstAccount.withdraw(firstInitialBalance)).not.toThrow();
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      firstAccount.transfer(firstInitialBalance + 1, secondAccount),
    ).toThrow(
      `Insufficient funds: cannot withdraw more than ${firstInitialBalance}`,
    );

    expect(() =>
      firstAccount.transfer(firstInitialBalance, secondAccount),
    ).not.toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      firstAccount.transfer(firstInitialBalance, firstAccount),
    ).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    firstAccount.deposit(500);
    expect(firstAccount.getBalance()).toBe(firstInitialBalance + 500);
  });

  test('should withdraw money', () => {
    firstAccount.withdraw(500);
    expect(firstAccount.getBalance()).toBe(firstInitialBalance - 500);
  });

  test('should transfer money', () => {
    const amount = 500;

    firstAccount.transfer(amount, secondAccount);
    expect(firstAccount.getBalance()).toBe(firstInitialBalance - amount);
    expect(secondAccount.getBalance()).toBe(secondInitialBalance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(firstAccount, 'fetchBalance')
      .mockResolvedValue(firstInitialBalance);

    const balance = await firstAccount.fetchBalance();

    expect(balance).not.toBeNull();
    expect(balance).toBe(firstInitialBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 1500;

    jest.spyOn(firstAccount, 'fetchBalance').mockResolvedValue(newBalance);

    await firstAccount.synchronizeBalance();

    expect(firstAccount.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(firstAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(firstAccount.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
