import axios from 'axios';
import { URL } from './types/url';

/**
 * Downloads the latest ISBN range message.
 * @module download
 * @param {URL} url - A URL of the ISBN range message.
 * @throws Will throw an error if downloading fails.
 */
export default (
  url: URL = 'https://www.isbn-international.org/export_rangemessage.xml',
): Promise<string> => new Promise((resolve, reject) => {
  axios.get(url, {
    maxBodyLength: 0,
    maxContentLength: 1024 * 1024, // B
    maxRedirects: 0,
    responseType: 'text',
    timeout: 3000, // ms
  })
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
