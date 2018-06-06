'use strict';

const path = require('path');
const fs = require('fs-extra');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
  root: appDirectory,
  src: resolveApp('src'),
  dist: resolveApp('dist'),
  appPkg: resolveApp('package.json'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveOwn('node_modules')
};

