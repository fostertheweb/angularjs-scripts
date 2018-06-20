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
  mode: 'development',
  entry: path.join(paths.src, 'app', 'app.module.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        include: paths.src,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: require.resolve('eslint-loader'),
        options: {
          eslintPath: require.resolve('eslint'),
          useEslintrc: false,
          baseConfig: eslintrc,
          emitWarning: true,
          failOnError: false
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          require.resolve('sass-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['> 1%', 'last 2 versions']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: [babelrc],
          cacheDirectory: true,
          compact: false
        }
      },
      {
        test: /\.html$/,
        loader: require.resolve('html-loader')
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[ext]'
        }
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
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
    new webpack.ProvidePlugin({
      $: require.resolve('jquery'),
      jQuery: require.resolve('jquery'),
      'window.jQuery': require.resolve('jquery')
    })
  ]
};
