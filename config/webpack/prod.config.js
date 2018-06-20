const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// config files
const paths = require("./paths");
const webpackConf = require("./base.config");

module.exports = merge(webpackConf, {
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        loaders: ExtractTextPlugin.extract({
          fallback: require.resolve("style-loader"),
          use: [
            {
              loader: require.resolve("css-loader"),
              options: {
                minimize: true
              }
            },
            {
              loader: require.resolve("sass-loader")
            },
            {
              loader: require.resolve("postcss-loader")
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { unused: true, dead_code: true, warnings: false } // eslint-disable-line camelcase
    }),
    new ExtractTextPlugin("index-[contenthash].css")
  ],
  output: {
    path: paths.dist,
    filename: "[name]-[hash].js"
  }
});
