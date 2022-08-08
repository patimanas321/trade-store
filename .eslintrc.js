module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'plugin:prettier/recommended',
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
      indent: ['error', 2]
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
  