import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import externals from './externals.mjs';

const paths = {
  lib: {
    input: 'src/index.tsx',
    outputFile: 'docs/static/lib/index.js',
  },
  playground: {
    input: 'playground/src/index.tsx',
    outputFile: 'docs/static/index.js',
  },
};

export default [{
  input: paths.lib.input,
  external: externals.keys,
  output: {
    file: paths.lib.outputFile,
    format: 'esm',
    globals: externals.globals,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ],
    }),
  ],
}, {
  input: paths.playground.input,
  output: {
    name: 'index',
    file: paths.playground.outputFile,
    format: 'umd',
  },
  plugins: [
    json(),
    resolve({
      browser: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ],
    }),
    commonjs(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}];
