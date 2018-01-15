const webpack = require('webpack');
module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [
          require.resolve('json-loader')
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('eslint-loader'),
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          require.resolve('ng-annotate-loader'),
          require.resolve('babel-loader')
        ]
      },
      {
        test: /\.html$/,
        loaders: [
          require.resolve('html-loader')
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {},
      debug: true
    })
  ],
  devtool: 'source-map'
};
