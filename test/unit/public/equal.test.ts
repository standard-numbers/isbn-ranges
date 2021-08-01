import { describe, expect, test } from '@jest/globals';
import { areEqual as equal } from '../../../src/index';

describe('The equal function', () => {
  test('throws an error if no objects are passed', () => {
    expect.assertions(1);
    return expect(equal([], 'key')).rejects.toThrow();
  });

  test('throws an error if only one object is passed', () => {
    expect.assertions(1);
    return expect(equal([{}], 'key')).rejects.toThrow();
  });

  test('uses the default key', () => {
    expect.assertions(1);
    const object = {
      ISBNRangeMessage: {
        MessageDate: 'value1',
        MessageSerialNumber: 'value2',
      },
    };
    return expect(equal([object, object])).resolves.toEqual(true);
  });

  test('throws an error if the key is an empty array', () => {
    expect.assertions(1);
    const object = { key: 'value' };
    return expect(equal([object, object], [])).rejects.toThrow();
  });

  test('throws an error if the key is an empty string', () => {
    expect.assertions(1);
    const object = { key: 'value' };
    return expect(equal([object, object], '')).rejects.toThrow();
  });

  test('detects objects with identical nullified properties', () => {
    expect.assertions(1);
    const object = { key: null };
    return expect(equal([object, object], 'key')).rejects.toThrow();
  });

  test('detects objects with identical non-empty properties', () => {
    expect.assertions(1);
    const object = { key: 'value' };
    return expect(equal([object, object], 'key')).resolves.toEqual(true);
  });

  test('detects objects with several identical non-empty properties', () => {
    expect.assertions(1);
    const object = {
      key1: 'value1',
      key2: 'value2',
    };
    return expect(
      equal([object, object], ['key1', 'key2']),
    ).resolves.toEqual(true);
  });
});
