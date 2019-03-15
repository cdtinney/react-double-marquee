import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import liveServer from 'rollup-plugin-live-server';

const paths = {
  input: 'playground/src/index.jsx',
  outputFile: 'playground/public/static/index.js',
};

module.exports = {
  input: paths.input,
  output: {
    name: 'index',
    file: paths.outputFile,
    format: 'umd',
  },
  plugins: [
    resolve({
      browser: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs({
      include: 'node_modules/**',
      exclude: [
        'node_modules/process-es6/**',
      ],
      namedExports: {
        'node_modules/react/index.js': [
          'Component',
          'PureComponent',
          'Fragment',
          'Children',
          'createElement',
        ],
        'node_modules/react-dom/index.js': [
          'render',
        ],
      },
    }),
    replace({
      'process.env.NODE_ENV':
        JSON.stringify('development'),
    }),
    liveServer({
      port: 8001,
      root: 'playground/public',
      file: 'playground/public/index.html',
    }),
  ],
};
