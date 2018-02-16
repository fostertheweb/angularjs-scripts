const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

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
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif)$/,
        loader: require.resolve('file-loader')
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      }
    }),
  ],
  devtool: 'source-map'
};

