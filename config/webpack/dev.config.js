const merge = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

// base webpack config
const webpackConf = require("./base.config");

module.exports = merge(webpackConf, {
  plugins: [new FriendlyErrorsWebpackPlugin()],
  devtool: "source-map"
});
