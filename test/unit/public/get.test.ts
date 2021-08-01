import {
  afterEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';
import axios from 'axios';
import { getLatestMessage as get } from '../../../src/index';

describe('The get function', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('handles an unsuccessful response', () => {
    expect.assertions(1);
    const error = new Error();
    jest.spyOn(axios, 'get').mockRejectedValue(error);
    return expect(get()).rejects.toThrow(error);
  });

  test('handles a successful response', () => {
    expect.assertions(1);
    const data = '<element>data</element>';
    jest.spyOn(axios, 'get').mockResolvedValue({ data });
    return expect(get()).resolves.toEqual({ element: 'data' });
  });

  test('handles a successful response with no content', () => {
    expect.assertions(1);
    const data = '';
    jest.spyOn(axios, 'get').mockResolvedValue({ data });
    return expect(get()).resolves.toEqual(null);
  });
});
