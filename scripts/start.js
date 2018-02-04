'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const chalk = require('chalk');
const config = require('../config/webpack.config.dev');
const paths = require('../config/paths');
const detect = require('detect-port-alt');

const localhost = 'localhost';
const devServerPort = detect(4200, localhost);
const browserSyncPort = detect(3000, localhost);

function configureWebpackDevServer(plugin) {
  return new WebpackDevServer(webpack({
    ...config,
    plugins: [...config.plugins, plugin]
  }), {
    inline: true,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    quiet: true,
    stats: {
      colors: true
    }
  })
}

function startServer() {
  return Promise.all([
    devServerPort,
    browserSyncPort
  ]).then((values) => {
    const server = configureWebpackDevServer(new BrowserSyncPlugin({
      host: 'localhost',
      port: values[1],
      proxy: `http://localhost:${values[0]}/`,
      reload: false
    }));

    server.listen(values[0], 'localhost', err => {
      if (err) {
        console.log(chalk.red(err))
      }
    });

    ['SIGINT', 'SIGTERM'].forEach(signal => {
      process.on(signal, () => {
        server.close();
        process.exit();
      });
    });
  });
}

startServer();
