import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';
import externals from './externals';

const paths = {
  input: 'src/index.jsx',
  dist: 'dist',
};

const plugins = () => [
  babel({
    exclude: 'node_modules/**',
  }),
  typescript(),
];

module.exports = [{
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
