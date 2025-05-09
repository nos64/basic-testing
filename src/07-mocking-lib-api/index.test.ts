import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

const mockAxios = axios as jest.Mocked<typeof axios>;
const mockGet = jest.fn();

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockAxiosInstance: AxiosInstance = {
      get: mockGet,
    } as unknown as AxiosInstance;

    mockAxios.create.mockReturnValue(mockAxiosInstance);
  });

  test('should create instance with provided base url', async () => {
    mockGet.mockResolvedValue({ data: [] });

    await throttledGetDataFromApi('/test');
    expect(mockAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockGet.mockResolvedValue({ data: [] });

    await throttledGetDataFromApi('/posts');
    expect(mockGet).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const responseData = [
      { userId: 1, id: 1, title: 'First post', body: 'Text' },
    ];
    mockGet.mockResolvedValue({ data: responseData });

    const data = await throttledGetDataFromApi('/posts');

    expect(data).toEqual(responseData);
  });
});
