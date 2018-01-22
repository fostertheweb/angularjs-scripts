const webpack = require('webpack');

// config files
const eslintrc = require('./eslintrc');
const babelrc = require('./babelrc');
const paths = require('./paths');

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
        include: paths.src,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: require.resolve('eslint-loader'),
          options: {
            eslintPath: require.resolve('eslint'),
            useEslintrc: false,
            baseConfig: eslintrc,
            emitWarning: true,
            failOnError: false
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          require.resolve('sass-loader'),
          require.resolve('postcss-loader')
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [babelrc],
              cacheDirectory: true
            }
          }
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
    }),
  ],
  devtool: 'source-map'
};

