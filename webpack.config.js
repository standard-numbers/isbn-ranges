// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
// import nodeExternals from 'webpack-node-externals';

const filename = fileURLToPath(import.meta.url);

const directoryName = dirname(filename);
const outputDirectoryName = resolve(directoryName, 'lib');
const sourceDirectoryName = resolve(directoryName, 'src');

/** @namespace */
const WebpackConfig = {
  /**
   * By default, the context is set to the CWD.
   * Set to an absolute path to make the configuration portable.
   * @see {@link https://webpack.js.org/configuration/entry-context/#context}
   */
  context: directoryName,

  /**
   * Keys of the object are used as values of `[name]` in
   * {@link WebpackConfig.output.filename|output.filename}.
   */
  entry: {
    'isbn-ranges': resolve(sourceDirectoryName, 'index.ts'),
  },

  /**
   * Experiments.
   */
  experiments: {
    /**
     * Use defaults of the next major webpack version.
     * @see {@link https://github.com/webpack/webpack/releases/tag/v5.53.0/}
     */
    futureDefaults: true,

    /**
     * If {@link WebpackConfig.output.library.type|output.library.type}
     * is `"module"`, then set this property to `true`.
     * @see {@link https://webpack.js.org/configuration/output/#type-module}
     */
    outputModule: true,
  },

  /**
   * Do not bundle...
   * @see {@link https://webpack.js.org/configuration/externals/}
   */
  externals: [
    // Do not bundle `node_modules`.
    // nodeExternals(),

    'axios',
    'jmespath',
    'xml2js',
  ],

  /**
   * Externals type.
   */
  externalsType: 'module',

  /** @namespace */
  module: {
    /** @namespace */
    rules: [
      /** @namespace */
      {
        /**
         * Directories to search for imported modules.
         * The fewer, the faster.
         * @memberof WebpackConfig.module.rules
         * @see {@link https://webpack.js.org/guides/build-performance/#loaders}
         */
        include: [
          sourceDirectoryName,
        ],

        /**
         * Files to apply the rule.
         * @memberof WebpackConfig.module.rules
         */
        test: /\.ts$/,

        /**
         * @memberof WebpackConfig.module.rules
         * @namespace
         */
        use: [
          {
            /**
             * If you use 'ts-loader', don't set `module` to `CommonJS`
             * in `tsconfig.json` to enable tree shaking.
             * `ts-loader` uses `include`, `files`, `exclude` (`tsconfig.json`).
             * @memberof WebpackConfig.module.rules.use
             */
            loader: 'ts-loader',

            /**
             * @memberof WebpackConfig.module.rules.use
             * @namespace
             */
            options: {
              /** @memberof WebpackConfig.module.rules.use.options */
              onlyCompileBundledFiles: true,

              /**
               * If you use `fork-ts-checker-webpack-plugin` and don't need
               * `*.d.ts`, set this property to `true` to disable type checking.
               * @see {@link https://webpack.js.org/guides/build-performance/}
               */
              // transpileOnly: true,

              /**
               * Set this property to `true` for consistency.
               * Set this property to `true` to speed up file processing.
               * @see {@link https://www.npmjs.com/package/ts-loader}
               */
              useCaseSensitiveFileNames: true,
            },
          },
        ],
      },
    ],
  },

  /** @namespace */
  output: {
    /**
     * The value of `[name]` is a key of the
     * {@link WebpackConfig.entry|entry} object.
     */
    filename: '[name].js',

    /** @memberof WebpackConfig.output */
    library: {
      type: 'module',
    },

    /** @memberof WebpackConfig.output */
    path: outputDirectoryName,
  },

  /**
   * `fork-ts-checker-webpack-plugin` requires {@link
   *   WebpackConfig.module.rules.use.options.transpileOnly|transpileOnly
   * } to be `true`.
   */
  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   eslint: {
    //     enabled: true,
    //     files: resolve(sourceDirectoryName, '**/*.ts'),
    //   },
    // }),
  ],

  /** @namespace */
  resolve: {
    /**
     * Filename extensions of imported modules.
     * The fewer, the faster.
     * @see {@link https://webpack.js.org/guides/build-performance/#resolving}
     */
    extensions: [
      '.ts',
    ],

    // mainFiles: ['index'],

    /**
     * Resolve symbolic links to their target paths.
     * Set to `false` to increase resolving speed.
     * @see {@link https://webpack.js.org/guides/build-performance/#resolving}
     */
    symlinks: false,
  },

  /**
   * The deployment target.
   * If the target is Node.js, use the closest LTS release, which is compatible
   * with the `engines.node` property of the package production dependencies.
   */
  target: 'node14.15',
};

/**
 * Call webpack with the `--node-env` key, which sets `process.env.NODE_ENV`.
 * @see {@link https://webpack.js.org/api/cli/#node-env}
 * @see {@link https://webpack.js.org/configuration/configuration-types/}
 * @see {@link https://webpack.js.org/guides/environment-variables/}
 */
export default (env, argv) => {
  const production = (argv.nodeEnv === 'production');
  return Object.assign(WebpackConfig, {
    /**
     * Generate `*.js.map` files.
     * @memberof WebpackConfig
     */
    devtool: production ? 'source-map' : 'eval-source-map',

    /**
     * Name of the configuration.
     * @memberof WebpackConfig
     */
    name: production ? 'isbn-ranges-prod' : 'isbn-ranges-dev',
  });
};
