module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    'babel',
    'jest',
    'import',
    '@typescript-eslint',
  ],
  rules: {
    'spaced-comment': 'off',
    'no-underscore-dangle': 'off',
  },
};
