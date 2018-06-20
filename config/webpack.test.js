const webpackConf = require("./webpack.config");

// config files
const babelrc = require("./babelrc");

module.exports = {
  module: {
    ...webpackConf.module,
    loaders: [
      ...webpackConf.module.loaders,
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
      }
    ]
  },
  devtool: "source-map"
};
