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
const serve = require('webpack-serve');
const chalk = require('chalk');
const detect = require('detect-port-alt');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const koaBrowserSync = require('koa-browser-sync');

// Configuartion Files
const config = require('../config/webpack.config.dev');
const paths = require('../config/paths');

const host = 'localhost';
const webpackServePort = detect(4200, host);
const browserSyncPort = detect(3000, host);

function startServer() {
  return Promise.all([
    webpackServePort,
    browserSyncPort
  ]).then(ports => {
    serve({
      config,
      content: paths.src,
      add: (app, middleware, options) => {
        app.use(koaBrowserSync({
          init: true,
          host,
          files: ['src/**/*.js', 'src/**/*.scss', 'src/**/*.html'],
          ignore: ['src/**/*.spec.js'],
          port: ports[1],
          proxy: `http://${host}:${ports[0]}/`,
          reload: false,
          single: true
        }));
        app.use(convert(history()));
      },
      hot: false,
      dev: {
        quiet: true,
        publicPath: paths.dist
      },
      port: ports[0]
    }).then(server => {
      ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => {
          server.close();
          process.exit();
        });
      });
    });
  });
}

startServer();
