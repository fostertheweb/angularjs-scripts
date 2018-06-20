"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const chalk = require("chalk");
const config = require("../config/webpack/dev.config");
const paths = require("../config/paths");
const detect = require("detect-port-alt");

function configureWebpackDevServer(plugin) {
  return new WebpackDevServer(
    webpack({
      ...config,
      plugins: [...config.plugins, plugin]
    }),
    {
      inline: true,
      historyApiFallback: true,
      hot: true,
      overlay: true,
      quiet: true,
      stats: {
        colors: true
      }
    }
  );
}

const host = "localhost";
const devServerPort = detect(4200, host);
const browserSyncPort = detect(3000, host);

function startServer() {
  return Promise.all([devServerPort, browserSyncPort]).then(ports => {
    const server = configureWebpackDevServer(
      new BrowserSyncPlugin({
        host,
        port: ports[1],
        proxy: `http://${host}:${ports[0]}/`,
        reload: false
      })
    );

    server.listen(ports[0], host, err => {
      if (err) {
        console.log(chalk.red(err));
      }
    });

    ["SIGINT", "SIGTERM"].forEach(signal => {
      process.on(signal, () => {
        server.close();
        process.exit();
      });
    });
  });
}

startServer();
