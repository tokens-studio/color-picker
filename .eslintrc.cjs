module.exports = {
  extends: ['eslint:recommended'],
  plugins: ['mocha'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    node: true,
    mocha: true,
    es6: true,
    browser: true,
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'mocha/no-skipped-tests': 'warn',
    'mocha/no-exclusive-tests': 'error',
  },
};
