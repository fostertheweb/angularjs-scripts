'use strict';

module.exports = {
  presets: [
    require.resolve('babel-preset-env'),
    require.resolve('babel-preset-stage-2')
  ],
  plugins: [
    [require.resolve('babel-plugin-angularjs-annotate'), {
      explicitOnly: true
    }],
    require.resolve('babel-plugin-transform-runtime'),
    require.resolve('babel-plugin-syntax-async-functions'),
    require.resolve('babel-plugin-syntax-class-properties')
  ]
};
