const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'semi': ['error', 'always'],
    "semi-spacing": ["error", {"before": false, "after": false}],
    'prettier/prettier': ['error', prettierOptions],
    'no-underscore-dangle': 2,
    'no-param-reassign': 2,
    'no-await-in-loop': 2,
    'no-use-before-define': 2,
    'no-restricted-syntax': 2,
    'global-require': 2,
  },
  globals: {},
};