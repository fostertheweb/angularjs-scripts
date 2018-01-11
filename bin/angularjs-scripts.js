#!/usr/bin/env node

'use strict';

const gulp = require('gulp');
require('../gulpfile'); // import gulp tasks
const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
  x => x === 'build'
    || x === 'serve'
    || x === 'serve:dist'
    || x === 'test'
    || x === 'test:auto'
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];

switch (script) {
  case 'build':
  case 'serve':
  case 'serve:dist':
  case 'test':
  case 'test:auto': {
    gulp.task(script)();
    break;
  }
  default:
    console.log('Unknown script "' + script + '".');
    console.log('Perhaps you need to update angularjs-scripts?');
    break;
}

