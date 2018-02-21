const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const DotenvPlugin = require('dotenv-webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// config files
const eslintrc = require('./eslintrc');
const babelrc = require('./babelrc');
const stylelintConfig = require('./stylelint.config');
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
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          require.resolve('sass-loader'),
          require.resolve('postcss-loader')
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [babelrc],
              cacheDirectory: true,
              compact: false
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
        loader: require.resolve('file-loader'),
        options: {
          name: 'assets/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new DotenvPlugin({
      path: path.join(paths.root, '.env'),
      slient: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(paths.src, 'index.html')
    }),
    new StyleLintPlugin({
      config: require('./stylelint.config')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      },
      debug: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  devtool: 'source-map',
  output: {
    path: paths.dist,
    filename: 'index.js'
  },
  entry: path.join(paths.src, 'app', 'app.module')
};
