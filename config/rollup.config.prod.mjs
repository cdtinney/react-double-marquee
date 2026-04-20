import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import externals from './externals.mjs';

const paths = {
  input: 'src/index.tsx',
  dist: 'dist',
};

const plugins = () => [
  typescript({
    tsconfig: './tsconfig.json',
    declaration: true,
    declarationDir: paths.dist,
  }),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
    extensions: ['.ts', '.tsx'],
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
  }),
];

export default [{
  input: paths.input,
  external: externals.keys,
  output: {
    file: `${paths.dist}/bundle.js`,
    name: 'Marquee',
    format: 'umd',
    globals: externals.globals,
  },
  plugins: plugins(),
}, {
  input: paths.input,
  external: externals.keys,
  output: {
    file: `${paths.dist}/bundle.esm.js`,
    format: 'esm',
    globals: externals.globals,
  },
  plugins: plugins(),
}];
