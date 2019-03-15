import babel from 'rollup-plugin-babel';

const paths = {
  input: 'src/index.jsx',
  dist: 'dist',
};

const external = [
  'react',
  'prop-types',
];

const globals = {
  react: 'React',
  'prop-types': 'PropTypes',
};

const plugins = () => [
  babel({
    exclude: 'node_modules/**',
  }),
];

module.exports = [{
  input: paths.input,
  external,
  output: {
    file: `${paths.dist}/bundle.js`,
    name: 'Marquee',
    format: 'umd',
    globals,
  },
  plugins: plugins(),
}, {
  input: paths.input,
  external,
  output: {
    file: `${paths.dist}/bundle.esm.js`,
    format: 'esm',
    globals,
  },
  plugins: plugins(),
}];
