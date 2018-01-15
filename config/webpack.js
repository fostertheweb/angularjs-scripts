const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

// config files
const eslintrc = require('./eslintrc');
const babelrc = require('./babelrc');
const karmaConfig = require('./karma');
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
      // {
      //   test: /\.js$/,
      //   include: paths.src,
      //   exclude: /node_modules/,
      //   enforce: 'pre',
      //   use: [
      //     {
      //       loader: require.resolve('eslint-loader'),
      //       options: {
      //         eslintPath: require.resolve('eslint'),
      //         baseConfig: {
      //           extends: [eslintrc]
      //         },
      //         ignore: false,
      //         useEslintrc: false
      //       }
      //     }
      //   ]
      // },
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
        include: paths.src,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ng-annotate-loader'),
          },
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
        loader: require.resolve('file-loader'),
        options: {
          name: 'assets/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(paths.src, 'index.html')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      },
      debug: true
    })
  ],
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), paths.dist),
    filename: 'index.js'
  },
  entry: path.join(paths.src, 'index')
};
