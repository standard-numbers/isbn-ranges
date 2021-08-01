import { parseStringPromise } from 'xml2js';
import { JSONValue } from './types/json-value';
import { XMLData } from './types/xml-data';

/**
 * Parses the ISBN range message presented in the XML format.
 * @module parse
 * @param {string} data - XML data.
 * @throws Will throw an error if parsing fails.
 */
export default (
  data: XMLData,
): Promise<JSONValue> => parseStringPromise(data, {
  explicitArray: false,
  ignoreAttrs: true,
  normalize: true, // Remove duplicate whitespaces.
  trim: true,
}) as Promise<JSONValue>;
