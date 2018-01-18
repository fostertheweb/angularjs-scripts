'use strict';

const envOptions = {
  targets: {
    ie: 10
  }
};

module.exports = {
  presets: [
    [require.resolve('babel-preset-env'), envOptions]
  ],
  plugins: [
    require.resolve('babel-plugin-transform-object-rest-spread'),
    [require.resolve('babel-plugin-angularjs-annotate'), {
      explicitOnly: true
    }]
  ]
};
