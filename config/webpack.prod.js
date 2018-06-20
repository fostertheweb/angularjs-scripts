const webpack = require("webpack");
const webpackConf = require("./webpack.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// config files
const paths = require("./paths");

module.exports = {
  module: {
    ...webpackConf.module,
    loaders: [
      ...webpackConf.module.loaders,
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
    ...webpackConf.module.plugins,
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
};
