'use strict';

const envOptions = {
  targets: {
    ie: 11
  }
};

module.exports = {
  presets: [
    [require.resolve('babel-preset-env'), envOptions]
  ],
  plugins: [
    [require.resolve('babel-plugin-angularjs-annotate'), {
      explicitOnly: true
    }]
  ]
};
