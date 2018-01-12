module.exports = {
  root: true,
  parser: 'babel-eslint',
  globals: {
    expect: true
  },
  env: {
    node: true,
    browser: true,
    jasmine: true,
    es6: true
  },
  extends: [
    'angular',
    'xo-space/esnext'
  ],
  rules: {
    'arrow-parens': [ 'as-needed', {
      requireForBlockBody: true
    }]
  }
};
