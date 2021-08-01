import download from './download';
import parse from './parse';
import { JSONValue } from './types/json-value';

/**
 * Downloads and parses the latest ISBN range message.
 * @module get
 */
export default async (): Promise<JSONValue> => {
  const message: string = await download();
  return parse(message);
};
