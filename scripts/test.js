'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const karma = require('karma');
const path = require('path');
const paths = require('../config/paths');
const cfg = require('karma').config;

const karmaCallback = (exitCode) => {
  console.log('Karma has exited with', exitCode);
  process.exit(exitCode);
};

const overrideConfig = (singleRun = false) => {
  return cfg.parseConfig(require.resolve('../config/karma'), {
    singleRun,
    autoWatch: !singleRun
  });
};

// Watch unless on CI or in coverage mode
const karmaConfig = overrideConfig(process.env.CI);
const karmaServer = new karma.Server(karmaConfig, karmaCallback);

karmaServer.start();

