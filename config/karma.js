'use strict';

const paths = require('./paths');
const path = require('path');

const entry = path.join(paths.src, 'index.spec.js');
const html = path.join(paths.src, '**/*.html');

module.exports = function (options) {
  const configuration = {
    basePath: paths.root,
    singleRun: true,
    autoWatch: false,
    logLevel: 'INFO',
    junitReporter: {
      outputDir: 'test-reports'
    },
    browsers: [
      'PhantomJS'
    ],
    frameworks: [
      'jasmine'
    ],
    files: [
      'node_modules/es6-shim/es6-shim.js',
      entry,
      html,
    ],
    preprocessors: {
      [entry]: [
        'webpack'
      ],
      [html]: [
        'ng-html2js'
      ]
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: `${paths.src}/`
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    webpack: require('./webpack.config.dev.conf'),
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require.resolve('karma-jasmine'),
      require.resolve('karma-junit-reporter'),
      require.resolve('karma-coverage'),
      require.resolve('karma-phantomjs-launcher'),
      require.resolve('karma-phantomjs-shim'),
      require.resolve('karma-ng-html2js-preprocessor'),
      require.resolve('karma-webpack')
    ]
  };

  options.set(configuration);
};

