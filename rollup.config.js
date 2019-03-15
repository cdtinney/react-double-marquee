import babel from 'rollup-plugin-babel';

module.exports = [{
  input: 'src/index.jsx',
  output: {
    file: 'dist/bundle.js',
    name: 'Marquee',
    format: 'umd',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}, {
  input: 'src/index.jsx',
  output: {
    file: 'dist/bundle.esm.js',
    format: 'esm',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}];
