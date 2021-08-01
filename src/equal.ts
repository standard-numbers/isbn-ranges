import { search } from 'jmespath';
import { JMESPath } from './types/jmespath';
import { JSONValue } from './types/json-value';

/**
 * Compares objects.
 * @module equal
 * @param {JSONValue[]} objects - Objects to compare.
 * @param {JMESPath | JMESPath[] | undefined} expr - JMESPath expressions.
 * @returns {boolean} True if properties exist and have equal non-null values.
 * @see {@link https://jmespath.org/} for the JMESPath documentation.
 */
export default (
  objects: JSONValue[],
  expr: JMESPath | JMESPath[] | undefined = [
    'ISBNRangeMessage.MessageDate',
    'ISBNRangeMessage.MessageSerialNumber',
  ],
): Promise<boolean> => new Promise((resolve, reject) => {
  const expressions = (Array.isArray(expr)) ? expr : [expr];
  if (!expressions.length) {
    // `[].every` returns true.
    return reject(new Error('No JMESPath expressions are passed'));
  }
  if (!Array.isArray(objects) || objects.length < 2) {
    return reject(new Error('Less than 2 objects are passed for comparison'));
  }
  return resolve(expressions.every((expression) => {
    const values = objects.map((object) => {
      const value = search(object, expression) as JSONValue;
      if (value === null) {
        return reject(new Error('Null values are not allowed'));
      }
      return value;
    });
    return new Set(values).size === 1;
  }));
});
