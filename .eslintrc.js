module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: [2, 'always'],
    indent: ['error', 2],
    'react/react-in-jsx-scope': 'off'
  },
  overrides: [
    {
      files: [
        '**/*.spec.js',
        '**/*.spec.jsx'
      ],
      env: {
        jest: true
      }
    }
  ]
};
