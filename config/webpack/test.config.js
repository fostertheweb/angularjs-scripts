const merge = require('webpack-merge')

// config files
const babelrc = require("../babelrc");
const webpackConf = require("./base.config");

module.exports = merge(webpackConf, {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              presets: [
                {
                  ...babelrc,
                  plugins: [
                    ...babelrc.plugins,
                    require.resolve("babel-plugin-rewire")
                  ]
                }
              ],
              cacheDirectory: true
            }
          }
        ]
      }jj
    ]
  },
  devtool: "source-map"
});
