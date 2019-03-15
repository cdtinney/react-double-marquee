import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/index.jsx',
  output: {
    file: 'dist/bundle.js',
    name: 'Marquee',
    format: 'cjs',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
