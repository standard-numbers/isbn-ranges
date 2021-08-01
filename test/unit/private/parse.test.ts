import { describe, expect, test } from '@jest/globals';
import parse from '../../../src/parse';

describe('The parse function', () => {
  test('parses an element with dots in its name', () => {
    expect.assertions(1);
    return expect(parse('<EAN.UCC>Content</EAN.UCC>')).resolves.toEqual({
      'EAN.UCC': 'Content',
    });
  });

  test('removes leading and trailing whitespaces from the data', async () => {
    expect.assertions(1);
    const object = await parse('<Range> 0000000-9999999 </Range>');
    expect(object).toEqual({ Range: '0000000-9999999' });
  });

  test('removes duplicate whitespaces from the character data', async () => {
    expect.assertions(1);
    const object = await parse('<Agency>United   States</Agency>');
    expect(object).toEqual({ Agency: 'United States' });
  });

  test('doesn\'t typecast the character data', async () => {
    expect.assertions(1);
    const object = await parse('<Prefix>978</Prefix>');
    expect(object).toEqual({ Prefix: '978' });
  });

  test('parses child elements', () => {
    expect.assertions(1);
    return expect(parse(`
      <Group>
        <Rules>
          <Rule>Content1</Rule>
        </Rules>
        <Rules>
          <Rule>Content2</Rule>
          <Rule>Content3</Rule>
        </Rules>
      </Group>
    `)).resolves.toEqual({
      Group: {
        Rules: [
          {
            Rule: 'Content1',
          },
          {
            Rule: [
              'Content2',
              'Content3',
            ],
          },
        ],
      },
    });
  });
});
