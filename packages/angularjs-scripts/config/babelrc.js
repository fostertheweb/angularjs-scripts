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
    require.resolve('babel-plugin-istanbul')
  ]
};
