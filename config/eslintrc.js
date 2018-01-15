'use strict';

module.exports = {
  root: true,
  parser: require.resolve('babel-eslint'),
  globals: {
    expect: true
  },
  env: {
    node: true,
    browser: true,
    jasmine: true,
    es6: true
  },
  plugins: [
    'angular',
    'babel'
  ],
  extends: [
    require.resolve('eslint-config-angular'),
    require.resolve('eslint-config-xo-space/esnext')
  ],
  rules: {
    'arrow-parens': ['as-needed', {
      requireForBlockBody: true
    }]
  }
};

