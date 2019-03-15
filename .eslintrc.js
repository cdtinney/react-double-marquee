module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
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
