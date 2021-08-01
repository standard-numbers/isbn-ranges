import {
  afterEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';
import axios from 'axios';
import download from '../../../src/download';

describe('The download function', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('does not throw an error when using the default URL', () => {
    expect.assertions(1);
    jest.spyOn(axios, 'get').mockResolvedValue({});
    return expect(download()).resolves.not.toThrow();
  });

  test('handles a successful response from the specified URL', () => {
    expect.assertions(1);
    const data = 'Hello, world!';
    jest.spyOn(axios, 'get').mockResolvedValue({ data });
    return expect(download('http://localhost/')).resolves.toEqual(data);
  });

  test('handles an unsuccessful response from the specified URL', () => {
    expect.assertions(1);
    const error = new Error();
    jest.spyOn(axios, 'get').mockRejectedValue(error);
    return expect(download('http://localhost/')).rejects.toThrow(error);
  });
});
