'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const webpack = require('webpack');
const fs = require('fs-extra');
const paths = require('../config/paths');
const config = require('../config/webpack.config.prod');

// empty the build folder
fs.emptyDirSync(paths.dist);

webpack(config, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  console.log(
    stats.toString({
      assets: true,
      chunks: false,
      children: false,
      colors: true,
      hash: false
    })
  );
});
