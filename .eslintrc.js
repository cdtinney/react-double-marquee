module.exports = {
  extends: 'airbnb',
  globals: {
    window: true,
  },
  parser: 'babel-eslint',
  plugins: [
    'babel',
  ],
  rules: {
    'spaced-comment': 'off',
    'no-underscore-dangle': 'off',
  }
};
