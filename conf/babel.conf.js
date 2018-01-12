module.exports = {
  presets: [
    [
      require.resolve('babel-preset-env'),
      {
        targets: {
          ie: 10,
          uglify: true
        }
      }
    ]
  ]
};
