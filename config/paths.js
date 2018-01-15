'use strict';

const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
  tmp: resolveApp('.tmp'),
  root: appDirectory,
  src: resolveApp('src'),
  dist: resolveApp('dist'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveOwn('node_modules')
};

