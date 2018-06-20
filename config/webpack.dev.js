const webpackConf = require("./webpack.config");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = {
  ...webpackConf,
  plugins: [...webpackConf.module.plugins, new FriendlyErrorsWebpackPlugin()],
  devtool: "source-map"
};
