module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'import/order': 0,
    'import/no-named-as-default': 0,
    'max-classes-per-file': 0,
  },
};
