/**
 * ECMAScript modules + TypeScript + Jest.
 * 1. Install `ts-jest`.
 * 2. Set `type` to `module` in `package.json`.
 * 3. Add `extensionsToTreatAsEsm: ['.ts']` to `jest.config.js`.
 * 4. Add `globals: {'ts-jest': { useESM: true } }` to `jest.config.js`.
 * 5. Add `preset: 'ts-jest/presets/default-esm'` to `jest.config.js`.
 * 6. Add `transform: {}` to `jest.config.js`.
 * 7. Run `NODE_OPTIONS=--experimental-vm-modules jest --no-cache`.
 * @namespace
 * @see {@link https://github.com/facebook/jest/issues/9430/}
 * @see {@link https://jestjs.io/docs/ecmascript-modules/}
 * @see {@link https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/}
 */
const JestConfig = {
  extensionsToTreatAsEsm: [
    // In addition to `.js` and `.mjs`.
    '.ts',
  ],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  injectGlobals: false,
  moduleFileExtensions: [
    // The most commonly used extensions should be listed first.
    'ts',
    'js', // Must be included.
  ],
  preset: 'ts-jest/presets/default-esm',
  roots: [
    '<rootDir>/test/',
  ],
  testRegex: /\.test\.ts$/.source,
  transform: {
  },
};

export default {
  projects: [
    {
      ...JestConfig,
      displayName: 'Unit testing',
      roots: [
        '<rootDir>/test/unit/',
      ],
    },
    {
      ...JestConfig,
      displayName: 'Integration testing',

      /**
       * Keys are stringified regular expressions. Try to avoid backslashes.
       * @memberof JestConfig
       * @see {@link https://github.com/kulshekhar/ts-jest/issues/364/}
       * @see {@link https://stackoverflow.com/a/51909197/}
       */
      moduleNameMapper: {
        '^([.]{2}/)+src/index$': '<rootDir>/lib/isbn-ranges',
      },

      roots: [
        // '<rootDir>/test/integration/',
        '<rootDir>/test/unit/public/',
      ],
    },
  ],
};
