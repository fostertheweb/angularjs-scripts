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
const path = require('path');
const chalk = require('chalk');
const port = 4000;
const webpackConf = require('../config/webpack');

const options = {
  hot: true,
  inline: true,
  stats: {
    colors: true
  }
};

const server = new WebpackDevServer(webpack(webpackConf), options);

server.listen(port, 'localhost', err => {
  if (err) {
    console.log(chalk.red(err))
  }

  console.log(chalk.cyan(`Development server running on port ${chalk.white.bold(port)}\n`));
});

['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    server.close();
    process.exit();
  });
});

